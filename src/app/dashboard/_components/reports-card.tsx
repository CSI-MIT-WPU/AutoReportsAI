
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import React from 'react'

export default function ReportsCard() {
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
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Type
                                </TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Status
                                </TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Date
                                </TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Sale
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-23
                                </TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Olivia Smith</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        olivia@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Refund
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Declined
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-24
                                </TableCell>
                                <TableCell className="text-right">$150.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Noah Williams</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        noah@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Subscription
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-25
                                </TableCell>
                                <TableCell className="text-right">$350.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Emma Brown</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        emma@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Sale
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-26
                                </TableCell>
                                <TableCell className="text-right">$450.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Sale
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-27
                                </TableCell>
                                <TableCell className="text-right">$550.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </ScrollArea>
        </Card>
    )
}
