import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserRepos } from "@/server/repo-queries";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { Branch } from "./_components/repos-list";
import { Repo } from "./_components/repos-card";
import { Textarea } from "@/components/ui/textarea";
import { FolderGit2, GitBranch, GitCommit, GitFork } from 'lucide-react';
import InfoCard from "./_components/stats-card";
import ReportsCard from "./_components/reports-card";
import ReposCard from "./_components/repos-card";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  const user = auth();
  const storedRepos = await getUserRepos(user?.userId as string);
  // const [repos, setRepos] = React.useState<Repo[]>([]);
  // const [report, setReport] = React.useState<string>("");
  // const [branches, setBranches] = React.useState<Branch[]>([]);

  const handleGetToken = async () => {
    await fetch("/api/get-access-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.userId,
        provider: "oauth_github",
      }),
    });
  };


  const getOrgRepos = async () => {
    const response = await fetch("/api/github/org-repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: Repo[] = await response.json();
    // setRepos(data);
  };

  // Temporary data for the cards
  const tempData = [
    {
      cardTitle: "Total Repos",
      cardMain: "32 Repos",
      cardSecondary: "15 Public, 17 Private",
      cardIcon: <FolderGit2 size={24}/>
    },
    {
      cardTitle: "Total Commits",
      cardMain: "104 Commits",
      cardSecondary: "82 Public, 22 Private",
      cardIcon: <GitCommit size={24}/>
    },
    {
      cardTitle: "Total Branches",
      cardMain: "4 Branches",
      cardSecondary: "2 feature, 2 fixes",
      cardIcon: <GitBranch size={24}/>
    },
    {
      cardTitle: "Total Forks",
      cardMain: "23 Forks",
      cardSecondary: "12 forks, 11 spoons",
      cardIcon: <GitFork size={24}/>
    },
  ]

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {
            tempData.map((data, index) => {
              return <InfoCard key={index} {...data}/>
            })
          }
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ReposCard repos={storedRepos.reverse()}/>
          <ReportsCard/>
        </div>
      </main>
  );
};

export default Dashboard;

    // <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
    //   <h1 className="text-lg font-bold">Dashboard</h1>
    //   <div className="flex space-x-4 justify-center">
    //     <Button onClick={handleGetToken}>Get Token</Button>
    //     <Button onClick={getRepos}>Get Repos</Button>
    //     <Button onClick={getOrgRepos}>Get Org Repos</Button>
    //   </div>
    //   <Button
    //     onClick={async () => {
    //       if (!user) return;
    //       const reposData = await getUserRepos(user.userId as string);
    //       console.log(reposData);
    //       setRepos(reposData as Repo[]);
    //     }}
    //   >
    //     Local Repo Fetch
    //   </Button>
    //   <div className="flex space-x-4">
    //     <ReposList repos={repos} setReport={setReport} branches={branches} setBranches={setBranches}/>
    //   </div>
    //   {report && (
    //     <Textarea className="max-w-lg" rows={10} value={report} readOnly />
    //   )}
    // </main>