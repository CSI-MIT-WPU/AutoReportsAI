"use client";

import FAQS from "./_components/faqs";
import Footer from "./_components/footer";
import HeroVid from "@/app/_components/heroVid";
import ProblemSec from "./_components/problemSec";
import HowItWorks from "./_components/howItWorks";
import HeroSection from "./_components/HeroSection";
import SolutionSec from "./_components/solutionSec";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="w-full flex flex-col items-center justify-center space-y-7">
        <HeroSection />
        <HeroVid />
        <ProblemSec />
        <SolutionSec />
        <HowItWorks />
        <FAQS />
        <Footer />
      </section>
    </main>
  );
}

// export const metadata: Metadata = {
//   title: "Home | Auto Reports AI",
//   description: "Generate reports for your Github repositories",
// };
