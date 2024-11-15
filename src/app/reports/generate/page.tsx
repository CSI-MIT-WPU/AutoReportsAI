"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getUserRepos } from "@/server/repo-queries";
import { ReposList } from "./_components/repos-list";

import ReposCard from '@/app/dashboard/_components/repos-card';
import { RotateCw } from 'lucide-react';

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import BlurFade from "@/components/magicui/blur-fade";

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

    // selected repo, branches, date
    // 3 component


    const handleGetToken = async () => {
        await fetch("/api/get-access-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user?.userId,
                provider: "oauth_github",
            }),
        });
    };

    const getRepos = async () => {
        const response = await fetch("/api/github/repos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: Repo[] = await response.json();
        setRepos(data);
    };

    const getOrgRepos = async () => {
        const response = await fetch("/api/github/org-repos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: Repo[] = await response.json();
        setRepos(data);
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


    // useEffect(() => {
    //     // Run Local Repo Fetch function on load
    //     const fetchUserRepos = async () => {
    //         if (!user) return;
    //         const reposData = await getUserRepos(user.userId as string);
    //         console.log(reposData);
    //         setRepos(reposData as Repo[]);
    //     };

    //     fetchUserRepos();
    // }, [user]);


    return (
        <>
            {/* <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <div className="flex space-x-4 justify-center">
                    <Button onClick={handleGetToken}>Get Token</Button>
                    <Button onClick={getRepos}>Get Repos</Button>
                    <Button onClick={getOrgRepos}>Get Org Repos</Button>
                </div>
                <Button
                    onClick={async () => {
                        if (!user) return;
                        const reposData = await getUserRepos(user.userId as string);
                        console.log(reposData);
                        setRepos(reposData as Repo[]);
                    }}
                >
                    Local Repo Fetch
                </Button>
                <div className="flex space-x-4">
                    <ReposList repos={repos} setReport={setReport} branches={branches} setBranches={setBranches} />
                </div>
                {report && (
                    <Textarea className="max-w-lg" rows={10} value={report} readOnly />
                )}
            </main> */}



            <section className="w-full min-h-screen flex flex-col items-center justify-center bg-background p-10">
                <div className="max-w-4xl w-full bg-card shadow-lg rounded-lg p-8 text-card-foreground space-y-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {step === 1 && (
                                <BlurFade delay={0.5} inView>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-3xl font-bold">1. Choose the Repository</h2>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="outline" size="icon" onClick={() => location.reload()} >
                                                            <RotateCw
                                                                className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 hover:animate-rotate-full"/>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Reset the form</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <p>Select the repository you want to generate the report for. You can only proceed with one repository at a time.</p>

                                        <div className="max-h-96 overflow-y-scroll border rounded-lg p-6">
                                            <FormField
                                                control={form.control}
                                                name="items"
                                                render={() => (
                                                    <FormItem>
                                                        {repos.toReversed().map((repo) => (
                                                            <FormField
                                                                key={repo.id}
                                                                control={form.control}
                                                                name="items"
                                                                render={({ field }) => {
                                                                    const isChecked = field.value.some(
                                                                        (item) => item.id === repo.id
                                                                    );
                                                                    return (
                                                                        <FormItem
                                                                            key={repo.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    checked={isChecked}
                                                                                    onCheckedChange={(checked) =>
                                                                                        handleRepoSelect(
                                                                                            repo,
                                                                                            field,
                                                                                            checked as boolean
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="font-normal">
                                                                                {repo.name}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        ))}
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <BlurFade delay={1} inView>
                                            <div className="flex justify-end">
                                                <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary" onClick={nextStep}>
                                                    Next: Choose Branch
                                                </Button>
                                            </div>
                                        </BlurFade>
                                    </div>
                                </BlurFade>
                            )}

                            {step === 2 && (
                                <BlurFade delay={0.5} inView>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                        <h2 className="text-3xl font-bold">2. Choose the Branch</h2>
                                                                                    <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="outline" size="icon" onClick={() => location.reload()} >
                                                            <RotateCw
                                                                className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 hover:animate-rotate-full"/>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Reset the form</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                        </div>
                                        <p>Now, select the branch you want to use for this report. Different branches may contain different data, so make sure to pick the right one.</p>
                                        <div className="max-h-96 overflow-y-scroll border rounded-lg p-6">
                                            <FormField
                                                control={form.control}
                                                name="branches"
                                                render={() => (
                                                    <FormItem>
                                                        {/* <div className="mb-4">
                                                        <FormLabel className="text-base">Branches</FormLabel>
                                                        <FormDescription>
                                                            Select branches
                                                        </FormDescription>
                                                    </div> */}
                                                        {
                                                            branches.map((branch, idx) => (
                                                                <FormField
                                                                    key={branch.commit.sha}
                                                                    control={form.control}
                                                                    name="branches"
                                                                    render={({ field }) => {
                                                                        // console.log(field)
                                                                        const _isChecked = field.value?.some(
                                                                            (item) => item?.commit.sha === branch.commit.sha
                                                                        );
                                                                        return (
                                                                            <FormItem
                                                                                key={branch.commit.sha}
                                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={_isChecked}
                                                                                        onCheckedChange={(checked) => {
                                                                                            handleBranchSelect(
                                                                                                branch,
                                                                                                field,
                                                                                                checked as boolean
                                                                                            )
                                                                                        }
                                                                                        }
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    {branch.name} ({branch.commit.url.split('/')[5]})
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        );
                                                                    }}
                                                                />
                                                            ))
                                                        }
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <BlurFade delay={1} inView>
                                            <div className="flex justify-between">
                                                <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary" onClick={previousStep}>
                                                    Previous: Choose Branch
                                                </Button>
                                                <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary" onClick={nextStep}>
                                                    Next: Choose Date Range
                                                </Button>
                                            </div>
                                        </BlurFade>
                                    </div>
                                </BlurFade>
                            )}

                            {step === 3 && (
                                <BlurFade delay={0.5} inView>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                        <h2 className="text-3xl font-bold">3. Choose the Date Range</h2>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="outline" size="icon" onClick={() => location.reload()} >
                                                            <RotateCw
                                                                className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 hover:animate-rotate-full"/>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Reset the form</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                        </div>
                                        <p>Finally, specify the date range for the report. You can choose the period over which you want to analyze the repository's activity.</p>
                                        <div className="max-h-96 overflow-y-scroll border rounded-lg p-6">
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
                                        <BlurFade delay={1} inView>
                                            <div className="flex justify-between">
                                                <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary" onClick={previousStep}>
                                                    Previous: Choose Date Range
                                                </Button>
                                                <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary">
                                                    Generate Report
                                                </Button>
                                            </div>
                                        </BlurFade>
                                    </div>
                                </BlurFade>
                            )}
                        </form>
                    </Form>
                    {report && (
                        <Textarea className="max-w-lg" rows={10} value={report} readOnly />
                    )}

                </div>
            </section>


        </>

    );
};

export default GenerateReport;