"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserRepos } from "@/server/repo-queries";
import { useAuth } from "@clerk/nextjs";
import React from "react";

export const dynamic = "force-dynamic";

const Dashboard = () => {
  const [repos, setRepos] = React.useState<any[]>([]);
  const [selectedRepos, setSelectedRepos] = React.useState<any[]>([]);
  const user = useAuth();
  const hanldeClick = async () => {
    await fetch("/api/get-access-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
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
    const data = await response.json();
    console.log(data);
  };

  const getOrgRepos = async () => {
    const response = await fetch("/api/github/org-repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const handleRepoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const repoId = e.target.value;

    if (repoId) {
      setSelectedRepos((prevState) =>
        prevState.some((repo) => repo.id === repoId)
          ? prevState.filter((repo) => repo.id !== repoId)
          : [...prevState, repoId]
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex space-x-4 justify-center">
        <Button onClick={hanldeClick}>Get Token</Button>
        <Button onClick={getRepos}>Get Repos</Button>
        <Button onClick={getOrgRepos}>Get Org Repos</Button>
      </div>
      <Button
        onClick={async () => {
          if (!user) return;
          const reposData = await getUserRepos(user.userId as string);
          setRepos(reposData);
        }}
      >
        Local Repo Fetch
      </Button>
      <div className="flex space-x-4">
        {repos && repos.length > 0 && (
          <div className="max-h-[500px] overflow-y-auto">
            {repos.toReversed().map((repo: any, index: number) => (
              <div key={repo.id} className="flex space-x-3">
                <input
                  type="checkbox"
                  value={repo.id}
                  onChange={handleRepoSelect}
                />
                <h2 className="font-semibold">{repo.name}</h2>
                <p className="font-light text-sm my-auto">{repo.owner}</p>
              </div>
            ))}
          </div>
        )}
        {selectedRepos.length > 0 && (
          <div>
            <h2 className="font-semibold">Selected Repos</h2>
            {repos
              .filter((repo: any) => selectedRepos.includes(repo.id))
              .map((repo: any) => (
                <div key={repo.id}> {repo.name} </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
