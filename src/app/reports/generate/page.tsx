"use client";

import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getUserRepos } from "@/server/repo-queries";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { generateReport } from "@/server/report-gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRepoCommits } from "@/server/commit-queries";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { DatePickerWithRange } from "@/app/dashboard/_components/range-picker";
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RepoList } from "./_components/repos-list";
import { Skeleton } from "@/components/ui/skeleton";
import { BranchList } from "./_components/branches-list";

const RepoSchema = z.object({
    id: z.string(),
    name: z.string(),
    owner: z.string(),
});

const CommitSchema = z.object({
    sha: z.string(),
    url: z.string(),
});

const BranchSchema = z.object({
    name: z.string(),
    commit: CommitSchema,
    protected: z.boolean(),
})

export type Repo = z.infer<typeof RepoSchema>;
export type Branch = z.infer<typeof BranchSchema>;

const FormSchema = z.object({
    items: z.array(RepoSchema).refine((value) => value.some((item) => item), {
        message: "You have to select at least one repo.",
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date().nullable().optional(),
    }),
    branches: z.array(BranchSchema).refine((value) => value.some((item) => item), {
        message: "You have to select at least one branch.",
    }),
});


const GenerateReport = () => {
    const [repos, setRepos] = React.useState<Repo[]>([]);
    const [reposLoading, setReposLoading] = React.useState<boolean>(false);
    const [report, setReport] = React.useState<string>("");
    const [branches, setBranches] = React.useState<Branch[]>([]);
    const user = useAuth();

    const storedRepos: any[] = []
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };
    const previousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
            dateRange: {
                from: new Date(),
                to: undefined,
            },
            branches: [],
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        if (!user)
            return toast({ title: "User not found", description: "User not found" });
        const userDoc = await getDoc(doc(db, `users/${user.userId}`));
        if (!userDoc.exists()) {
            return new Response("User not found", { status: 404 });
        }
        const userData = userDoc.data();
        const accessToken = userData.accessToken;
        const username = userData.external_accounts[0].username;
        console.log(data.items)
        let commits: any[] = [];
        await Promise.all(
            data.items.map(async (repo: Repo, index) => {
                try {
                    const repoCommits = await getRepoCommits(
                        repo.name,
                        repo.owner,
                        data.branches[index].name,
                        accessToken,
                        username,
                        data.dateRange.from.toISOString(),
                        data.dateRange.to?.toISOString() || new Date().toISOString(),
                        100
                    );
                    if (typeof repoCommits === "string") {
                        console.error(
                            `Error fetching commits for ${repo.name}: ${repoCommits}`
                        );
                        return [];
                    }
                    commits.push(repoCommits);
                } catch (error) {
                    console.error(`Exception fetching commits for ${repo.name}:`, error);
                    return [];
                }
            })
        );
        const allCommits = commits.flat();
        console.log(allCommits);
        const feedback = await generateReport(
            allCommits,
            data.dateRange.from.toISOString(),
            data.dateRange.to?.toISOString() || new Date().toISOString()
        );

        await addDoc(collection(db, `users/${user.userId}/reports`), {
            feedback: feedback,
            date: new Date(),
            items: data.items,
        });

        setReport(feedback);

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    async function getBranches(repo: Repo): Promise<any> {
        console.log("getting branches")
        const userDoc = await getDoc(doc(db, `users/${user?.userId}`));
        if (!userDoc.exists()) {
            return new Response("User not found", { status: 404 });
        }
        const userData = userDoc.data();
        const accessToken = userData.accessToken;
        const username = userData.external_accounts[0].username;

        const response = await fetch(
            `https://api.github.com/repos/${repo.owner}/${repo.name}/branches`,
            {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(`GitHub API Error: ${errorText}`, {
                status: response.status,
            });
        }

        const branches = await response.json();
        console.log(branches);
        return branches;
    }

    const handleRepoSelect = (
        repo: Repo,
        field: {
            value: Repo[];
            onChange: (value: Repo[]) => void;
        },
        checked: boolean
    ) => {
        console.log(field)
        if (checked) {
            getBranches(repo).then((_branches) => {
                console.log(_branches)
                _branches.map((branch: Branch) => {
                    setBranches((prevBranches) => [...prevBranches, branch]);
                });
            });
            field.onChange([...field.value, repo]);
        } else {
            field.onChange(field.value.filter((item) => item.id !== repo.id));
        }
    };

    const handleBranchSelect = (
        branch: Branch,
        field: {
            value: Branch[];
            onChange: (value: Branch[]) => void;
        },
        checked: boolean
    ) => {
        console.log(field);
        if (checked) {
            field.onChange([...field.value, branch]);
        } else {
            field.onChange(field.value.filter((item) => item.name !== branch.name));
        }
    };

    
    //THIS USE EFFECT CAUSED 52K requests to be sent:
    // React.useEffect(() => {
    //     if(user){
    //         setReposLoading(true);
    //         getUserRepos(user?.userId as string)
    //             .then((data) => {
    //                 setRepos(data);
    //                 setReposLoading(false);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching repositories:", error);
    //                 setReposLoading(false);
    //             }
    //         );
    //     }
    // }, [user]); i think the issue was that a new user object is passed on every render even if the user info is the same thus causing an infinite loop


    //This useEffect is the correct one (i think)
    React.useEffect(() => {
        if(user.userId){
            setReposLoading(true);
            getUserRepos(user.userId as string)
                .then((data) => {
                    setRepos(data);
                    setReposLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching repositories:", error);
                    setReposLoading(false);
                }
            );
        }
    }, [user.userId]); // does not cause an infinite loop because userId stays the same

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center bg-background p-10">
            <div className="max-w-4xl w-full bg-card shadow-lg rounded-lg p-8 text-card-foreground space-y-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {
                            step === 1 && (
                                <div className="space-y-5">
                                    <h2 className="text-3xl font-bold">1. Choose the Repository</h2>
                                    <p>Select the repository you want to generate the report for. You can only proceed with one repository at a time.</p>
                                    {
                                        reposLoading ? (
                                            <p>Loading your repositories...</p>
                                        ) :
                                            <RepoList form={form} repos={repos} handleRepoSelect={handleRepoSelect} />
                                    }
                                </div>
                            )
                        }
                        {step === 2 && (
                            <div className="space-y-5">
                                <h2 className="text-3xl font-bold">2. Choose the Branch</h2>
                                <p>Select the branch you want to generate the report for. You can only proceed with one branch at a time.</p>
                                <BranchList form={form} branches={branches} handleBranchSelect={handleBranchSelect} />
                            </div>
                        )}
                        {step === 3 && (
                            <div className="space-y-5">
                                <h2 className="text-3xl font-bold">3. Choose the Date Range</h2>
                                <p>Select the date range you want to generate the report for.</p>
                                <FormField
                                    control={form.control}
                                    name="dateRange"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date Range</FormLabel>
                                            <DatePickerWithRange field={field as any} />
                                        </FormItem>
                                    )}
                                />                         
                            </div>
                        )}
                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button onClick={previousStep}>Previous</Button>
                            )}
                            {step < 3 && (
                                <Button onClick={nextStep}>Next</Button>
                            )}
                            {step === 3 && (
                                // <Button type="submit">Generate Report</Button>
                                <button onClick={(e) => console.log(form.getValues())}>click</button>
                            )}
                        </div>
                    </form>
                </Form>

                {report && (
                    <Textarea className="max-w-lg" rows={10} value={report} readOnly />
                )}

            </div>
        </section>
    );
};

export default GenerateReport;