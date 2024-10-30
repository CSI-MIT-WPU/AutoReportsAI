"use client";

import React from 'react'
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TemplateList } from './_components/templates-list';
import { TemplateViewer } from './_components/templates-viewer';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export interface CustomTemplate {
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

export default function Templates() {

  const [customTemplates, setCustomTemplates] = React.useState([] as CustomTemplate[]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<CustomTemplate | null>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="min-h-screen items-stretch"
    >
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8"
              />
            </div>
          </form>
        </div>
        <TemplateList
          customTemplates={customTemplates}
          selectedTemplate={selectedTemplate || customTemplates[0]}
          setSelectedTemplate={setSelectedTemplate}
          loading={loading}
          setOpen={setOpen}
          open={open}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={655}
        className="hidden md:block"
      >
        <TemplateViewer
          customTemplate={selectedTemplate || customTemplates[0]}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
