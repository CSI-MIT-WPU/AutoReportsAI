"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Report } from "../page";

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
                                <div className="text-muted-foreground">Created at:</div>
                                <div className="text-sm"></div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-muted-foreground">Description</div>
                                <div className="text-sm">{report.feedback}</div>
                            </div>
                            <Separator />
                            <iframe
                                src={report.id}
                                className="h-[32rem]"
                                style={{ width: "100%" }}
                            />
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            No interview selected
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
