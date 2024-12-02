import React from "react";
import { auth } from "@clerk/nextjs/server";
import InfoCard from "./_components/stats-card";
import ReposCard from "./_components/repos-card";
import { getUserRepos } from "@/server/repo-queries";
import ReportsCard from "./_components/reports-card";
import { getUserReports } from "@/server/reports-queries";
import { getUserTemplates } from "@/server/template-queries";
import {
  ClipboardMinus,
  Clock,
  FolderGit2,
  LayoutPanelTop,
} from "lucide-react";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  const user = auth();
  const storedRepos = await getUserRepos(user?.userId as string);
  const storedReports = await getUserReports(user?.userId as string);
  const storedTemplates = await getUserTemplates(user?.userId as string);

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
        `${
          storedReports.length > 0 ?
          new Date(
          storedReports?.map((report) => report.date).slice(-1)[0]?.seconds *
            1000 +
            storedReports?.map((report) => report.date).slice(-1)[0]
              ?.nanoseconds /
              1e6
        )
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-") : "No Reports Available!"}` || "No Latest Report",
      cardSecondary: 
        `${
          storedReports.length > 0 ?
          "Latest report was generated on " +
          new Date(
          storedReports?.map((report) => report.date).slice(-1)[0]?.seconds *
            1000 +
            storedReports?.map((report) => report.date).slice(-1)[0]
              ?.nanoseconds /
              1e6
        )
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-") : "Generate a Report!"}` || "No Latest Report",
      cardIcon: <Clock size={24} />,
    },
  ];

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {cardData.map((data, index) => {
            return <InfoCard key={index} {...data} />;
          })}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ReposCard repos={storedRepos.reverse()} />
          <ReportsCard
            reports={storedReports
              .sort((a, b) => b.date.toMillis() - a.date.toMillis())
              .slice(0, 5)}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
