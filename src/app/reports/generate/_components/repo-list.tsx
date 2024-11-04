"use client";

import { z } from "zod";
import React from "react";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { generateReport } from "@/server/report-gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRepoCommits } from "@/server/commit-queries";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { DatePickerWithRange } from "../../../dashboard/_components/range-picker";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

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

export function ReposList({
  repos,
  setReport,
  branches,
  setBranches
}: {
  repos: Repo[];
  setReport: React.Dispatch<React.SetStateAction<string>>;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
}) {
  const user = useAuth();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}