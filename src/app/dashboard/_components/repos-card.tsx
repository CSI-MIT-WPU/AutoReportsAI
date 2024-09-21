import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react'
import { z } from 'zod';

const RepoSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  private: z.boolean(),
  ownerAvatar: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;

export default function ReposCard({ repos }: { repos: Repo[] }) {
  return (
    <Card x-chunk="dashboard-01-chunk-5" className='h-[28rem]'>
      <ScrollArea className='h-[28rem]'>
        <CardHeader>
          <CardTitle>Repositories</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          {
            repos.reverse().map((repo) => {
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
