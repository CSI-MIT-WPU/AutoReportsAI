import { getUserReports } from "@/server/reports-queries";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { convertFirestoreTimestampToDate } from "@/lib/utils";

const Reports = async () => {
  const user = auth();
  const userId = user?.userId;
  const reports = await getUserReports(userId as string);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <h1 className="text-lg font-bold">Reports</h1>
      <Accordion type="single" collapsible className="w-full max-w-lg">
        {reports &&
          reports.map((report: any) => (
            <AccordionItem key={report.id} value="item-1">
              <AccordionTrigger>
                {convertFirestoreTimestampToDate(report.date).toDateString()}
              </AccordionTrigger>
              <AccordionContent>
                <Textarea
                  className="max-w-lg"
                  rows={20}
                  value={report.feedback}
                  readOnly
                />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </main>
  );
};

export default Reports;
