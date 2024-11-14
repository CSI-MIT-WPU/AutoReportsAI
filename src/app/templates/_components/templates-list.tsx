"use client";

import React from 'react'
import { cn } from '@/lib/utils';
import { CustomTemplate } from '../page';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import TemplatesMobileViewer from './templates-mobile-viewer';

export const TemplateList: React.FC<{
        customTemplates: CustomTemplate[],
        selectedTemplate: CustomTemplate,
        setSelectedTemplate: any
        loading: boolean,
        setOpen: any,
        open: boolean
        searchTerm: string
    }> = ({
        customTemplates,
        selectedTemplate,
        setSelectedTemplate,
        loading,
        setOpen,
        open,
        searchTerm,
    }) => {
    const isMobile = useIsMobile();
    return (
        <>
            <div className="flex flex-col gap-2 p-4 pt-0 h-[82vh]">
                {
                    loading ? (
                        <div className="flex flex-col gap-8 pt-8">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ) : (
                        customTemplates
                            .filter(customTemplate =>
                                searchTerm === "" || customTemplate.title.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((customTemplate, index) => {
                                if (!customTemplate.createdAt) return null;
                                return (
                                    <button
                                        key={index}
                                        className={cn(
                                            "flex justify-between items-start rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                            selectedTemplate.createdAt === customTemplate.createdAt && "bg-muted",
                                        )}
                                        onClick={() => {
                                            setSelectedTemplate(customTemplate)
                                            setOpen(true)
                                        }}
                                    >
                                        <div>
                                            <div className="text-lg font-bold">{customTemplate.title}</div>
                                            <div className="text-sm">{customTemplate.description}</div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(customTemplate.createdAt) + " ago"}
                                        </div>
                                    </button>
                                );
                            })
                    )
                }
            </div>
            {
                isMobile ? (
                    <TemplatesMobileViewer
                        open={open}
                        setOpen={setOpen}
                        template={
                            customTemplates.filter((customTemplate) => customTemplate.createdAt === selectedTemplate.createdAt)[0]
                        }
                    />
                ) : (
                    null
                )
            }
        </>
    )
}
