"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateList } from "./_components/templates-list";
import { TemplateViewer } from "./_components/templates-viewer";
import CreateTemplate from "./_components/create-template-modal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface CustomTemplate {
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

export default function Templates() {
  const [customTemplates, setCustomTemplates] = React.useState([] as CustomTemplate[]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<CustomTemplate | null>(customTemplates[0]);
  const [createTemplateDialogOpen, setCreateTemplateDialogOpen] = React.useState(false);
  const [serachTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function getCustomTemplates() {
      try {
        setLoading(true);
        const response = await fetch("/api/templates");
        if (!response.ok) {
          throw new Error(`An error occured. Status: ${response.status}`);
        }
        const data = await response.json();
        setCustomTemplates(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch custom templates:", error);
      }
    }

    getCustomTemplates();
  }, [reloadKey]);

  //function to close/open the create template dialog box
  const toggleDialogState = () => setCreateTemplateDialogOpen(!createTemplateDialogOpen);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="min-h-screen items-stretch"
    >
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="flex justify-between gap-4 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="w-[80%]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8"
                defaultValue={serachTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <Dialog open={createTemplateDialogOpen} onOpenChange={setCreateTemplateDialogOpen}>
            <Button onClick={(e) => setCreateTemplateDialogOpen(true)}>Create New Template</Button>
            <DialogContent className="max-h-screen z-[1000]">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>
                  A template is the format for a report. Upload a PDF file or
                  enter the format manually to define the structure and format
                  for generating commit reports.
                </DialogDescription>
              </DialogHeader>
              <CreateTemplate toggleDialogState={toggleDialogState} setReloadKey={setReloadKey}/>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea>
          <TemplateList
            customTemplates={customTemplates.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)}
            selectedTemplate={selectedTemplate || customTemplates[0]}
            setSelectedTemplate={setSelectedTemplate}
            loading={loading}
            setOpen={setOpen}
            open={open}
            searchTerm={serachTerm}
          />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={655} className="hidden md:block">
        <TemplateViewer
          customTemplate={selectedTemplate || customTemplates[0]}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
