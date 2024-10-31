import React from "react";
import { auth } from "@clerk/nextjs/server";
import InfoCard from "./_components/stats-card";
import { Repo } from "./_components/repos-card";
import ReposCard from "./_components/repos-card";
import { getUserRepos } from "@/server/repo-queries";
import ReportsCard from "./_components/reports-card";
import { getUserReports } from "@/server/reports-queries";
import { FolderGit2, GitBranch, GitCommit, GitFork } from "lucide-react";
import Navbar from "./_components/navbar";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  const user = auth();
  const storedRepos = await getUserRepos(user?.userId as string);
  const storedReports = await getUserReports(user?.userId as string);

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
      cardIcon: <FolderGit2 size={24} />,
    },
    {
      cardTitle: "Total Commits",
      cardMain: "104 Commits",
      cardSecondary: "82 Public, 22 Private",
      cardIcon: <GitCommit size={24} />,
    },
    {
      cardTitle: "Total Branches",
      cardMain: "4 Branches",
      cardSecondary: "2 feature, 2 fixes",
      cardIcon: <GitBranch size={24} />,
    },
    {
      cardTitle: "Total Forks",
      cardMain: "23 Forks",
      cardSecondary: "12 forks, 11 spoons",
      cardIcon: <GitFork size={24} />,
    },
  ];

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {tempData.map((data, index) => {
            return <InfoCard key={index} {...data} />;
          })}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ReposCard repos={storedRepos.reverse()} />
          <ReportsCard reports={storedReports.reverse().slice(0, 5)} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
