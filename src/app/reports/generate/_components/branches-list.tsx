import { z } from 'zod'
import React from 'react'
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
    branches: Branch[];
    handleBranchSelect: (branch: Branch, field: any, checked: boolean) => void;
}

export const BranchList: React.FC<BranchListProps> = ({ form, branches, handleBranchSelect }) => {
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
                                        // console.log(field)
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
