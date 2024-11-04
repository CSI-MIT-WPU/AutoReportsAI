import { z } from 'zod';
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

const RepoSchema = z.object({
    id: z.string(),
    name: z.string(),
    owner: z.string(),
});
export type Repo = z.infer<typeof RepoSchema>;

interface RepoListProps {
    form: any;
    repos: Repo[];
    handleRepoSelect: (repo: Repo, field: any, checked: boolean) => void;
}

export const RepoList: React.FC<RepoListProps> = ({ form, repos, handleRepoSelect }) => {
    return (
        <div className="max-h-[500px] overflow-y-auto">
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
                                        (item: any) => item.id === repo.id
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
    )
}
