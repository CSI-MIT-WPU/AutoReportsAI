"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { BarChart2, Timer, Wrench } from "lucide-react";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animates once when it comes into view

  return (
    <section className="w-4/5 flex flex-col items-center mx-auto my-12">
      <motion.h3
        ref={ref}
        className="text-primary font-semibold text-3xl underline underline-offset-4"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}} // Only animate if in view
        transition={{ delay: 1, duration: 1.5, type: "spring" }}
      >
        The Problem
      </motion.h3>
      <div className="flex flex-col md:flex-row md:space-x-20 space-y-12 md:space-y-0 my-12">
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col space-y-3">
            <Timer className="h-10 w-10" />
            <div className="text-2xl font-semibold">Manual Monitoring</div>
            <p className="text-lg">
              Growing hydroponic produce requires regular monitoring of water
              levels, nutrients, and environmental factors, which can be
              time-consuming and tedious for most people.
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={0.35} inView>
          <div className="flex flex-col space-y-3">
            <Wrench className="h-10 w-10" />
            <div className="text-2xl font-semibold">Complex Setup</div>
            <p className="text-lg">
              Setting up a hydroponic system involves complex technical
              knowledge, making it challenging for beginners to get started and
              maintain a successful setup.
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={0.45} inView>
          <div className="flex flex-col space-y-3">
            <BarChart2 className="h-10 w-10" />
            <div className="text-2xl font-semibold">Inconsistent Growth</div>
            <p className="text-lg">
              Without proper management of water, light, and nutrients, plant
              growth can be inconsistent, leading to wasted time, effort, and
              resources.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default ProblemSection;
