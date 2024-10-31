"use client";

import React from 'react'
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import ReportMobileViewer from './reports-mobile-viewer';
import { Report } from '../page';

export const ReportsList: React.FC<{
    reports: Report[],
    selectedReport: Report | null,
    setSelectedReport: any
    loading: boolean,
    setOpen: any,
    open: boolean
    searchTerm: string
}> = ({
    reports,
    selectedReport,
    setSelectedReport,
    loading,
    setOpen,
    open,
    searchTerm,
}) => {
        const isMobile = useIsMobile();
        return (
            <>
                <ScrollArea className="">
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
                                reports
                                    .filter(report =>
                                        searchTerm === "" || new Date(report.date.seconds * 1000).toLocaleDateString("en-GB").includes(searchTerm.toLowerCase())
                                    )
                                    .map((report, index) => {
                                        if (!report.id) return null;
                                        return (
                                            <button
                                                key={index}
                                                className={cn(
                                                    "flex justify-between items-start rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                                    selectedReport?.id === report.id && "bg-muted",
                                                )}
                                                onClick={() => {
                                                    setSelectedReport(report)
                                                    setOpen(true)
                                                }}
                                            >
                                                <div>
                                                    <div className="text-lg font-bold">{"Report on " + new Date(report.date.seconds * 1000).toLocaleDateString("en-GB")}</div>
                                                    <div className="text-sm">{"report id: " + report.id}</div>
                                                </div>
                                                <div className="text-xs text-muted-foreground">

                                                </div>
                                            </button>
                                        );
                                    })
                            )
                        }
                    </div>
                </ScrollArea>
                {
                    isMobile ? (
                        <ReportMobileViewer
                            open={open}
                            setOpen={setOpen}
                            report={selectedReport}
                        />
                    ) : (
                        null
                    )
                }
            </>
        )
    }
