"use client";
import React, { useState } from "react";
import ReposCard from "../dashboard/_components/repos-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const GenReport = () => {
  const user = useAuth();

  const storedRepos: any[] = [];

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const previousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background p-10">
      <div className="max-w-4xl w-full bg-card shadow-lg rounded-lg p-8 text-card-foreground space-y-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold">1. Choose the Repository</h2>
            <p>
              Select the repository you want to generate the report for. You can
              only proceed with one repository at a time.
            </p>
            <ReposCard repos={storedRepos.reverse()} />
            <div className="flex justify-end">
              <Button
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary"
                onClick={nextStep}
              >
                Next: Choose Branch
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold">2. Choose the Branch</h2>
            <p>
              Now, select the branch you want to use for this report. Different
              branches may contain different data, so make sure to pick the
              right one.
            </p>
            <ReposCard repos={storedRepos.reverse()} />
            <div className="flex justify-between">
              <Button
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary"
                onClick={previousStep}
              >
                Previous: Choose Branch
              </Button>
              <Button
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary"
                onClick={nextStep}
              >
                Next: Choose Date Range
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold">3. Choose the Date Range</h2>
            <p>
              Finally, specify the date range for the report. You can choose the
              period over which you want to analyze the repository activity.
            </p>
            <ReposCard repos={storedRepos.reverse()} />
            <div className="flex justify-between">
              <Button
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary"
                onClick={previousStep}
              >
                Previous: Choose Date Range
              </Button>
              <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary">
                Generate Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenReport;
