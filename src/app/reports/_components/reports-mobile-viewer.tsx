"use client";

import { Report } from "../page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ReportMobileViewer({
        open,
        setOpen,
        report,
    }: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
        report: Report | null;
    }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">{report?.id}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    {report ? (
                        <div className="flex flex-1 flex-col p-4 space-y-4 overflow-y-scroll pb-20">
                            <div>
                                <div className="text-muted-foreground">Created On:</div>
                                <div className="text-sm">{new Date(report.date.seconds * 1000).toLocaleDateString("en-GB")}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-muted-foreground">Report</div>
                                <Textarea
                                    rows={30}
                                    readOnly
                                    value={report.feedback}
                                    style={{ scrollbarWidth: "none", width: "100%", fontSize: "0.875rem" }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            No report selected
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
