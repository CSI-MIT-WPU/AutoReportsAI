"use client"

import React from 'react'
import { Template } from '../page';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

type TemplateListProps = {
    form: any
    templates: Template[],
    handleTemplateSelect: (template: Template, field: any, checked: boolean) => void
}

export const TemplateList: React.FC<TemplateListProps> = ({ form, templates, handleTemplateSelect }) => {
    return (
        <div className="max-h-[500px] overflow-y-auto">
            <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Select a template</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                            >
                                {
                                    templates.map((template, idx) => {
                                        return (
                                            <FormItem className="flex items-center space-x-3 space-y-0" key={idx}>
                                                <FormControl>
                                                    {/* in the line below i am using the index as a way to differentiate between the values in case 2 templates have same headings */}
                                                    <RadioGroupItem value={`${idx}?${template.headings.join(" ")}`} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {template.title}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}