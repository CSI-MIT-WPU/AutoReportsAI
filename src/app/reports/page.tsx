"use client";

import { getUserReports } from "@/server/reports-queries";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReportsList } from "./_components/reports-list";
import { ReportViewer } from "./_components/reports-viewer";
import { Timestamp } from "firebase/firestore";

export interface Report {
  id: string,
  date: Timestamp,
  feedback: string,
}

const Reports = () => {

  const { isSignedIn, userId } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [serachTerm, setSearchTerm] = React.useState("");
  const [reports, setReports] = React.useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(null);

  React.useEffect(() => {
    if (isSignedIn) {
      setLoading(true);
      getUserReports(userId)
        .then((data) => {
          setReports(data);
        })
        .catch((error) => {
          console.error(error);
        }
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isSignedIn, userId]);

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
                defaultValue={serachTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
        <ReportsList
          reports={reports}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          loading={loading}
          setOpen={setOpen}
          open={open}
          searchTerm={serachTerm}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={655}
        className="hidden md:block"
      >
        <ReportViewer
          report={selectedReport}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};

export default Reports;
