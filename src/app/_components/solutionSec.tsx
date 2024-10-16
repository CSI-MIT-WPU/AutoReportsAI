"use client";
import React, { useRef } from "react";
import { LeafIcon, MonitorIcon, PlugIcon, SlidersIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { motion, useInView } from "framer-motion";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Ripple from "@/components/magicui/ripple";

const solutions = [
  {
    Icon: SlidersIcon,
    name: "Automated Control",
    description:
      "Hydrobud's IoT device monitors key metrics like water pH, temperature, and light, automatically adjusting conditions in real time to ensure optimal growth, freeing you from manual labor.",
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
    Icon: PlugIcon,
    name: "Easy Setup",
    description:
      "Our device is designed for simplicity. With an easy plug-and-play setup, even beginners can get started without any prior knowledge of hydroponics.",
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
    Icon: LeafIcon,
    name: "Consistent Growth",
    description:
      "By maintaining ideal conditions, Hydrobud promotes faster, more consistent, and healthier growth, ensuring better yields and quality produce with less effort.",
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
      "Our user-friendly dashboard lets you track the health and progress of your plants in real time. Easily adjust settings, monitor metrics, and control your system remotely.",
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
    <div className="w-full bg-neutral-100 py-16">
      <div className="w-full flex flex-col items-center justify-center space-y-5">
        <p className="dark:text-black">SOLUTIONS</p>
        <h2 className="text-5xl font-semibold dark:text-black">
          Empower Your Business with AI Workflows
        </h2>
        <p className="text-base font-medium text-center leading-6 tracking-wide text-slate-600 max-w-2xl">
          Generic AI tools suffice. Our platform is purpose-built to provide
          exceptional AI-driven solutions for your unique business needs.
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
          <BentoGrid className="lg:grid-rows-3 ">
            {solutions.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </div>
  );
}

export default SolutionSec;
