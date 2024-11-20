"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import Ripple from "@/components/magicui/ripple";
import { motion, useInView } from "framer-motion";
import DotPattern from "@/components/magicui/dot-pattern";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { TargetIcon, MonitorIcon, UserCheck, TimerIcon } from "lucide-react";

const solutions = [
  {
    Icon: TimerIcon,
    name: "Reduced Time and Effort",
    description:
      "Automating the process eliminates the need to manually review commits, significantly saving time and effort. Spend less time on reporting and more time on coding.",
    href: "/",
    cta: "Learn more",
    background: (
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_top,white,transparent)]"
        )}
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: UserCheck,
    name: "User friendly",
    description:
      "Our platform is designed to be user-friendly, with a simple and intuitive interface that makes it easy to generate detailed reports with just a few clicks.",
    href: "/",
    cta: "Learn more",
    background: (
      <Ripple
        mainCircleOpacity={0.15}
        className=" h-[400px]  origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: TargetIcon,
    name: "Improved Accuracy",
    description:
      "The app ensures that all relevant commits are included, reducing the risk of errors or omissions in the report. Get a comprehensive overview of your contributions.",
    href: "/",
    cta: "Learn more",
    background: (
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_top,white,transparent)]"
        )}
      />
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: MonitorIcon,
    name: "Smart Dashboard",
    description:
      "Our platform provides a smart dashboard that displays all the relevant information in one place, making it easy to track your repos and generated reports.",
    href: "/",
    cta: "Learn more",
    background: (
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_right,white,transparent)]"
        )}
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-4",
  },
];

function SolutionSec() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animates once when it comes into view

  return (
    <div className="w-full py-16 dark:text-white">
      <div className="w-full flex flex-col items-center justify-center space-y-5">
        <p className="dark:text-white">SOLUTIONS</p>
        <h2 className="text-5xl font-semibold dark:text-white text-center">
          Generate Your Reports Using AutoReportsAI
        </h2>
        <p className="text-base font-medium text-center leading-6 tracking-wide text-slate-500 max-w-2xl">
          Generic AI tools suffice. Our platform is purpose-built to provide
          exceptional AI-driven reports for a comprehensive and detailed report.
        </p>
      </div>

      <div className="w-4/5 mx-auto flex flex-col items-center my-20">
        <motion.h3
          ref={ref}
          className="text-accent-foreground font-semibold text-3xl underline underline-offset-4 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}} // Only animate if in view
          transition={{ delay: 0.2, duration: 1.5, type: "spring" }}
        >
          Our Solution
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}} // Only animate if in view
          transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
        >
          <BentoGrid className="lg:grid-rows-3">
            {solutions.map((feature) => (
              <BentoCard key={feature.name} {...feature}/>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </div>
  );
}

export default SolutionSec;
