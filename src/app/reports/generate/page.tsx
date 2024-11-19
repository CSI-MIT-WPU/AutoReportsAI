"use client";

import { z } from "zod";
import React from "react";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { getUserRepos } from "@/server/repo-queries";
import { generateReport } from "@/server/report-gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRepoCommits } from "@/server/commit-queries";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { DatePickerWithRange } from "@/app/dashboard/_components/range-picker";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { RepoList } from "./_components/repos-list";
import { BranchList } from "./_components/branches-list";
import { TemplateList } from "./_components/templates-list";
import { getUserTemplates } from "@/server/template-queries";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import BlurFade from "@/components/magicui/blur-fade";
import { RotateCw } from 'lucide-react';



export const Icons = {
    spinner: Loader2,
};

export const dynamic = "force-dynamic";

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
});

const TemplateSchema = z.object({
    id: z.string(),
    title: z.string(),
    headings: z.array(z.string()),
    description: z.string(),
});

const FormSchema = z.object({
    items: z.array(RepoSchema).refine((value) => value.some((item) => item), {
        message: "You have to select at least one repo.",
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date().nullable().optional(),
    }),
    branches: z
        .array(BranchSchema)
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one branch.",
        }),
    template: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;
export type Branch = z.infer<typeof BranchSchema>;
export type Template = z.infer<typeof TemplateSchema>;

const GenerateReport = () => {
    const user = useAuth();
    const router = useRouter();
    const [step, setStep] = React.useState<number>(1);
    const [repos, setRepos] = React.useState<Repo[]>([]);
    const [report, setReport] = React.useState<string>("");
    const [templates, setTemplates] = React.useState<Template[]>([]);
    const [selectedRepos, setSelectedRepos] = React.useState<Repo[]>([]);
    const [reposLoading, setReposLoading] = React.useState<boolean>(false);
    const [reportGenerating, setReportGenerating] =
        React.useState<boolean>(false);

    const nextStep = () => {
        if (step === 1) {
            if (!form.watch("items").length) {
                return toast({
                    variant: "destructive",
                    title: "No Repository Selected",
                    description: "Please select at least one repository.",
                });
            }
        } else if (step === 2) {
            if (!form.watch("branches").length) {
                return toast({
                    variant: "destructive",
                    title: "No Branch Selected",
                    description: "Please select at least one branch.",
                });
            }
        } else if (step === 3) {
            const { from, to } = form.watch("dateRange");
            if (!from || !to) {
                return toast({
                    variant: "destructive",
                    title: "Invalid Date Range",
                    description: "Please select a valid date range.",
                });
            }
        }

        setStep((prevStep) => prevStep + 1);
    };


    const previousStep = () => {
        setStep((prevStep) => prevStep - 1);
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
            template: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);

        if (!user)
            return toast({ title: "User not found", description: "User not found" });

        const userDoc = await getDoc(doc(db, `users/${user.userId}`));
        if (!userDoc.exists())
            return new Response("User not found", { status: 404 });
        const userData = userDoc.data();
        const accessToken = userData.accessToken;
        const username = userData.external_accounts[0].username;

        console.log(data.items);
        setReportGenerating(true);

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
            data.dateRange.to?.toISOString() || new Date().toISOString(),
            data.template.split("?")[1]
        );

        await addDoc(collection(db, `users/${user.userId}/reports`), {
            feedback: feedback,
            date: new Date(),
            items: data.items,
        });

        router.push("/reports");
        setReport(feedback);
        setReportGenerating(false);

        toast({
            title: "Success",
            description: "Report generated successfully.",
        });
    }

    const handleRepoSelect = (
        repo: Repo,
        field: {
            value: Repo[];
            onChange: (value: Repo[]) => void;
        },
        checked: boolean
    ) => {
        console.log(field);
        if (checked) {
            setSelectedRepos([...selectedRepos, repo]);
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

    const handleTemplateSelect = (
        template: Template,
        field: {
            value: Template[];
            onChange: (value: Template[]) => void;
        },
        checked: boolean
    ) => {
        console.log(field);
        if (checked) {
            field.onChange([...field.value, template]);
        } else {
            field.onChange(field.value.filter((item) => item.id !== template.id));
        }
    };

    React.useEffect(() => {
        if (!user) {
            return;
        }
        setReposLoading(true);
        getUserRepos(user.userId as string)
            .then((data) => {
                setRepos(data);
            })
            .catch((error) => {
                console.error("Error fetching repositories:", error);
            })
            .finally(() => {
                setReposLoading(false);
            });

        getUserTemplates(user.userId as string)
            .then((data) => {
                setTemplates(data);
            })
            .catch((error) => {
                console.error("Error fetching templates: ", error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                                                            className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 hover:animate-rotate-full" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Reset the form</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>                                    <p>
                                        Select the repository you want to generate the report for. You
                                        can only proceed with one repository at a time.
                                    </p>
                                    {reposLoading ? (
                                        <p>Loading your repositories...</p>
                                    ) : (
                                        <RepoList
                                            form={form}
                                            repos={repos}
                                            handleRepoSelect={handleRepoSelect}
                                        />
                                    )}
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
                                                            className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 hover:animate-rotate-full" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Reset the form</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>                                    <p>
                                        Select the branch you want to generate the report for. You can
                                        only proceed with one branch at a time.
                                    </p>
                                    <BranchList
                                        form={form}
                                        selectedRepos={selectedRepos}
                                        handleBranchSelect={handleBranchSelect}
                                    />
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
                                                            className="h-[1.2rem] w-[1.2rem] transition-transform duration-500 hover:animate-rotate-full" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Reset the form</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    </div>                                    <p>
                                        Select the date range you want to generate the report for.
                                    </p>
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
                            </BlurFade>
                        )}
                        {step === 4 && (
                            <div className="space-y-5">
                                <h2 className="text-3xl font-bold">
                                    4. Choose a report template
                                </h2>
                                <p>Choose a template for your report.</p>
                                <TemplateList
                                    form={form}
                                    templates={templates}
                                    handleTemplateSelect={handleTemplateSelect}
                                />
                            </div>
                        )}
                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button onClick={previousStep} type="button">
                                    Previous
                                </Button>
                            )}
                            {step < 4 && (
                                <Button onClick={nextStep} type="button">
                                    Next
                                </Button>
                            )}
                            {step === 4 && <Button type="submit">Generate Report</Button>}
                        </div>
                    </form>
                </Form>
                {reportGenerating ? (
                    <div className="flex flex-col justify-center items-center">
                        <Icons.spinner className="h-16 w-16 animate-spin" />
                        <p className="text-center">Generating your report...</p>
                    </div>
                ) : null}
                {report && (
                    <Textarea className="w-full" rows={30} value={report} readOnly />
                )}
            </div>
        </section>
    );
};

export default GenerateReport;
