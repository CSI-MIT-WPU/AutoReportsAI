import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardProps {
    cardTitle: string;
    cardMain: string;
    cardSecondary: string;
    cardIcon: JSX.Element;
}

export default function InfoCard({
    cardTitle,
    cardMain,
    cardSecondary,
    cardIcon
}: CardProps) {
    return (
        <>
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {cardTitle}
                </CardTitle>
                {cardIcon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cardMain}</div>
                <p className="text-xs text-muted-foreground">
                    {cardSecondary}
                </p>
            </CardContent>
        </Card>
        </>
    )
}
