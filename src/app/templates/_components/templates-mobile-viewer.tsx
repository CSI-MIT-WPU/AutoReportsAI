"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CustomTemplate } from "../page";

export default function TemplatesMobileViewer({
    open,
    setOpen,
    template,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    template: CustomTemplate | null;
}) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Interview Details</DialogTitle>
                    <DialogDescription>
                        View details of your past interview here.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                    {template ? (
                        <div className="flex flex-1 flex-col p-4 space-y-4 overflow-y-scroll pb-20">
                            <div>
                                <div className="font-semibold text-center text-xl">
                                    Interview Report
                                </div>
                                <Separator className="my-2" />
                                <div className="flex-1 whitespace-pre-wrap text-center">
                                    a random date
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-lg">Score</div>
                                <Separator className="my-2" />

                            </div>
                            {/* Ai Suggestions */}
                            <div>
                                <div className="font-semibold text-lg">AI Suggestions</div>
                                <Separator className="my-2" />
                                <div className="flex-1 whitespace-pre-wrap text-sm">
                                    <div className="flex flex-col text-wrap">
                                        something suggestions
                                    </div>
                                </div>
                            </div>
                            {/* Ai Feedback */}
                            <div>
                                <div className="font-semibold text-lg">AI Feedback</div>
                                <Separator className="my-2" />
                                <div className="whitespace-pre-wrap text-sm text-wrap">
                                    some feedback
                                </div>
                            </div>
                            {/* Human Feedback */}
                            <div>
                                <div className="font-semibold text-lg">Human Feedback</div>
                                <Separator className="my-2" />
                                <div className="whitespace-pre-wrap text-sm text-wrap">
                                    template feedback
                                </div>
                            </div>
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
