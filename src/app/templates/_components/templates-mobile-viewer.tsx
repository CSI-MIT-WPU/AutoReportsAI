"use client";

import { CustomTemplate } from "../page";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

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
                    <DialogTitle className="text-center text-xl">{template?.title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    {template ? (
                        <div className="flex flex-1 flex-col p-4 space-y-4 overflow-y-scroll pb-20">
                            <div>
                                <div className="text-muted-foreground">Created at:</div>
                                <div className="text-sm">{new Date(template.createdAt).toLocaleString()}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-muted-foreground">Description</div>
                                <div className="text-sm">{template.description}</div>
                            </div>
                            <Separator />
                            <iframe
                                src={template.fileUrl}
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
