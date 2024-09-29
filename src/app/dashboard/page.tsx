"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserRepos } from "@/server/repo-queries";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { Branch, Repo, ReposList } from "./_components/repos-list";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";

const Dashboard = () => {
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [report, setReport] = React.useState<string>("");
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const user = useAuth();

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

  const getRepos = async () => {
    const response = await fetch("/api/github/repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: Repo[] = await response.json();
    setRepos(data);
  };

  const getOrgRepos = async () => {
    const response = await fetch("/api/github/org-repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: Repo[] = await response.json();
    setRepos(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex space-x-4 justify-center">
        <Button onClick={handleGetToken}>Get Token</Button>
        <Button onClick={getRepos}>Get Repos</Button>
        <Button onClick={getOrgRepos}>Get Org Repos</Button>
      </div>
      <Button
        onClick={async () => {
          if (!user) return;
          const reposData = await getUserRepos(user.userId as string);
          console.log(reposData);
          setRepos(reposData as Repo[]);
        }}
      >
        Local Repo Fetch
      </Button>
      <div className="flex space-x-4">
        <ReposList repos={repos} setReport={setReport} branches={branches} setBranches={setBranches}/>
      </div>
      {report && (
        <Textarea className="max-w-lg" rows={10} value={report} readOnly />
      )}
    </main>
  );
};

export default Dashboard;
