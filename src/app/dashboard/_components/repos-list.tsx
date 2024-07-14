"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { DatePickerWithRange } from "./range-picker";
import React from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { getRepoCommits } from "@/server/commit-queries";
import { generateReport } from "@/server/report-gen";

const RepoSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;

const FormSchema = z.object({
  items: z.array(RepoSchema).refine((value) => value.some((item) => item), {
    message: "You have to select at least one repo.",
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date().nullable().optional(),
  }),
});

export function ReposList({
  repos,
  setReport,
}: {
  repos: Repo[];
  setReport: React.Dispatch<React.SetStateAction<string>>;
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
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user)
      return toast({ title: "User not found", description: "User not found" });
    const userDoc = await getDoc(doc(db, `users/${user.userId}`));
    if (!userDoc.exists()) {
      return new Response("User not found", { status: 404 });
    }
    const userData = userDoc.data();
    const accessToken = userData.accessToken;
    const username = userData.external_accounts[0].username;

    const commits = await Promise.all(
      data.items.map(async (repo: Repo) => {
        try {
          const repoCommits = await getRepoCommits(
            repo.name,
            repo.owner,
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

          return repoCommits;
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

  const handleRepoSelect = (
    repo: Repo,
    field: {
      value: Repo[];
      onChange: (value: Repo[]) => void;
    },
    checked: boolean
  ) => {
    if (checked) {
      field.onChange([...field.value, repo]);
    } else {
      field.onChange(field.value.filter((item) => item.id !== repo.id));
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
        <div className="max-h-[500px] overflow-y-auto">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Repos</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>

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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
