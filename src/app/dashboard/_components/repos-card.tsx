"use client";

import { z } from 'zod';
import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RepoSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  private: z.boolean(),
  ownerAvatar: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;

export default function ReposCard({ repos }: { repos: Repo[] }) {
  const [currRepos, setCurrRepos] = React.useState<Repo[]>(repos);
  const [loading, setLoading] = React.useState(false);

  const getRepos = async () => {
    let tempRepos: Repo[] = [];
    setLoading(true);
    const response = await fetch("/api/github/repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    result.map((repo: any) => {
      tempRepos.push({
        id: repo.id.toString(),
        name: repo.name,
        owner: repo.owner.login,
        private: repo.private,
        ownerAvatar: repo.owner.avatar_url
      });
    });
    setLoading(false);
    setCurrRepos(tempRepos);
  };

  return (
    <Card x-chunk="dashboard-01-chunk-5" className='h-[28rem]'>
      <ScrollArea className='h-[28rem]'>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>Repositories</CardTitle>
            <Button onClick={getRepos}>
              <RefreshCcw size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {
            loading ? (
              <>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </>
            ) :
              currRepos.map((repo) => {
                return (
                  <div className="flex items-center gap-4" key={repo.id}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={repo.ownerAvatar} alt="Avatar" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {repo.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {repo.owner}
                      </p>
                    </div>
                    <div className="ml-auto font-thin">
                      {
                        repo.private ?
                          <p className='text-red-400'>Private</p>
                          :
                          <p className='text-green-400'>Public</p>
                      }
                    </div>
                  </div>
                )
              })
          }
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
