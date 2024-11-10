"use client";

import { z } from 'zod';
import React from 'react';
import { Repo } from '../page';
import { db } from '@/lib/firebase';
import { useAuth } from '@clerk/nextjs';
import { doc, getDoc } from 'firebase/firestore';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const CommitSchema = z.object({
    sha: z.string(),
    url: z.string(),
});

const BranchSchema = z.object({
    name: z.string(),
    commit: CommitSchema,
    protected: z.boolean(),
})

export type Branch = z.infer<typeof BranchSchema>;

interface BranchListProps {
    form: any;
    selectedRepos: Repo[];
    handleBranchSelect: (branch: Branch, field: any, checked: boolean) => void;
}

export const BranchList: React.FC<BranchListProps> = ({ form, selectedRepos, handleBranchSelect }) => {

    const user = useAuth();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [branches, setBranches] = React.useState<Branch[]>([]);

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

    React.useEffect(() => {
        const fetchBranches = async () => {
            setLoading(true);
            const branchLists = await Promise.all(
                selectedRepos.map(async (repo) => {
                    const data = await getBranches(repo);
                    return data?.map((branch: any) => ({
                        name: branch.name,
                        commit: {
                            sha: branch.commit.sha,
                            url: branch.commit.url,
                        },
                        protected: branch.protected,
                    })) || [];
                })
            );
            const allBranches = branchLists.flat();
            setBranches(allBranches);
            setLoading(false);
        };
        
        fetchBranches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-h-[500px] overflow-y-auto">
            <FormField
                control={form.control}
                name="branches"
                render={() => (
                    <FormItem>
                        {                            
                            branches.map((branch, idx) => (
                                <FormField
                                    key={branch.commit.sha}
                                    control={form.control}
                                    name="branches"
                                    render={({ field }) => {
                                        const _isChecked = field.value?.some(
                                            (item: any) => item?.commit.sha === branch.commit.sha
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
    )
}
