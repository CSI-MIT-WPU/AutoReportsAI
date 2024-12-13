"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Report } from "../page";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import ReportMobileViewer from "./reports-mobile-viewer";

export const ReportsList: React.FC<{
    reports: Report[];
    selectedReport: Report | null;
    setSelectedReport: any;
    loading: boolean;
    setOpen: any;
    open: boolean;
    searchTerm: string;
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
                <div className="flex flex-col gap-2 p-4 pt-0 h-[82vh]">
                    {loading ? (
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
                            .filter(
                                (report) =>
                                    searchTerm === "" ||
                                    report.items.some((item) =>
                                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                            )
                            .map((report, index) => {
                                console.log(report)
                                if (!report.id) return null;
                                return (
                                    <button
                                        key={index}
                                        className={cn(
                                            "flex justify-between items-start rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                            selectedReport?.id === report.id && "bg-muted"
                                        )}
                                        onClick={() => {
                                            setSelectedReport(report);
                                            setOpen(true);
                                        }}
                                    >
                                        <div>
                                            <div className="text-lg font-bold h-10 text-ellipsis">
                                                {report.items.length > 1
                                                    ? `${report.items[0].name} and ${report.items.length - 1
                                                    } more...`
                                                    : `${report.items[0].name}`}
                                            </div>

                                            <div className="text-sm">
                                                {report.dateRange?.from?.seconds && report.dateRange?.to?.seconds ? (
                                                    `Report from ${new Date(report.dateRange.from.seconds * 1000).toLocaleDateString("en-GB")} to ${new Date(report.dateRange.to.seconds * 1000).toLocaleDateString("en-GB")}`
                                                ) : report.dateRange?.from?.seconds ? (
                                                    `Report from ${new Date(report.dateRange.from.seconds * 1000).toLocaleDateString("en-GB")} to Date Not Provided`
                                                ) : report.dateRange?.to?.seconds ? (
                                                    `Report from Date Not Provided to ${new Date(report.dateRange.to.seconds * 1000).toLocaleDateString("en-GB")}`
                                                ) : (
                                                    "Report from Date Not Provided to Date Not Provided"
                                                )}
                                            </div>

                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(report.date.seconds * 1000).toLocaleDateString(
                                                "en-GB"
                                            )}
                                        </div>
                                    </button>
                                );
                            })
                    )}
                </div>
                {isMobile ? (
                    <ReportMobileViewer
                        open={open}
                        setOpen={setOpen}
                        report={selectedReport}
                    />
                ) : null}
            </>
        );
    };
