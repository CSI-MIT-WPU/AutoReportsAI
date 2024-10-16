import { z } from 'zod'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const ReportSchema = z.object({
    id: z.string(),
    date: z.string(),
    feedback: z.string(),
});

export type Reports = z.infer<typeof ReportSchema>;

export default function ReportsCard({ reports }: { reports: Reports[] }) {
    return (
        <Card
            className="xl:col-span-2 h-[28rem]" x-chunk="dashboard-01-chunk-4"
        >
            <ScrollArea className="h-[28rem] rounded-md border">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Your Reports</CardTitle>
                        <CardDescription>
                            Recently created reports will appear here
                        </CardDescription>
                    </div>
                    <Button className="ml-auto gap-1">
                        <Link href="#">
                            View All
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                {
                                    reports.map((report, key) => {
                                        const match = report?.date?.toString()?.match(/seconds=(\d+)/);
                                        const seconds = match ? parseInt(match[1]) : null;

                                        return (
                                            <TableCell className="w-full" key={key}>
                                                {seconds ? (
                                                    <div className="font-medium">
                                                        Report generated on {new Date(seconds * 1000).toLocaleString('en-US', { hour12: false })}
                                                    </div>
                                                ) : (
                                                    <div className="font-medium">
                                                        Date not available
                                                    </div>
                                                )}
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    report id: {report?.id}
                                                </div>
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </ScrollArea>
        </Card>
    )
}
