"use client";

import React, { useEffect, useState } from "react";
import InfoCard from "./_components/stats-card";
import ReposCard from "./_components/repos-card";
import ReportsCard from "./_components/reports-card";
import {
  ClipboardMinus,
  Clock,
  FolderGit2,
  LayoutPanelTop,
  Loader2,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { getUserRepos } from "@/server/repo-queries";
import { getUserReports } from "@/server/reports-queries";
import { getUserTemplates } from "@/server/template-queries";

const Dashboard = () => {
  const { userId } = useAuth();
  const [storedRepos, setStoredRepos] = useState<any[]>([]);
  const [storedReports, setStoredReports] = useState<any[]>([]);
  const [storedTemplates, setStoredTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
      console.log(userId)
      try {
        const [repos, reports, templates] = await Promise.all([
          getUserRepos(userId),
          getUserReports(userId),
          getUserTemplates(userId),
        ]);
        setStoredRepos(repos);
        setStoredReports(reports);
        setStoredTemplates(templates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardData = [
    {
      cardTitle: "Total Repositories",
      cardMain: `${storedRepos.length || 0} Repositories`,
      cardSecondary: `${
        storedRepos?.filter((repo) => repo.private).length || 0
      } Private, ${
        storedRepos?.filter((repo) => !repo.private).length || 0
      } Public`,
      cardIcon: <FolderGit2 size={24} />,
    },
    {
      cardTitle: "Total Reports",
      cardMain: `${storedReports.length || 0} Reports`,
      cardSecondary: `${storedReports.length} reports generated.`,
      cardIcon: <ClipboardMinus size={24} />,
    },
    {
      cardTitle: "Total Templates",
      cardMain: `${storedTemplates.length || 0} Templates`,
      cardSecondary: `${storedTemplates.length || 0} custom templates created.`,
      cardIcon: <LayoutPanelTop size={24} />,
    },
    {
      cardTitle: "Latest report",
      cardMain:
        storedReports.length > 0
          ? new Date(
              storedReports[storedReports.length - 1].date.seconds * 1000 +
                storedReports[storedReports.length - 1].date.nanoseconds / 1e6
            )
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "No Reports Available!",
      cardSecondary:
        storedReports.length > 0
          ? "Latest report was generated on " +
            new Date(
              storedReports[storedReports.length - 1].date.seconds * 1000 +
                storedReports[storedReports.length - 1].date.nanoseconds / 1e6
            )
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "Generate a Report!",
      cardIcon: <Clock size={24} />,
    },
  ];

  if (loading) {
    return <Loader2 className="animate-spin mx-auto my-24" />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {cardData.map((data, index) => (
          <InfoCard key={index} {...data} />
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ReposCard repos={storedRepos.reverse()} />
        <ReportsCard
          reports={storedReports
            .sort((a, b) => b.date.seconds - a.date.seconds)
            .slice(0, 5)}
        />
      </div>
    </main>
  );
};

export default Dashboard;
