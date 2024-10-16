"use client";
import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const heroSection = () => {
  return (
    <section id="header" className="py-24 space-y-7 text-center">
      <BlurFade delay={0.25} inView className="space-y-5">
        <div className="z-10 flex items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/6 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing AutoReportsAI</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>

        <h2 className="text-6xl text-center font-semibold ">
          Automate your <br /> workflow with AI
        </h2>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <span className="text-slate-500 text-2xl tracking-tighter ">
          No matter what problem you have, our AI can help you solve it.
        </span>
      </BlurFade>
      <BlurFade delay={0.25 * 3} inView>
        <Button>Get started for free</Button>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <span className="text-slate-500 text-xl tracking-tighter ">
          7 day free trial. No credit card required.
        </span>
      </BlurFade>
    </section>
  );
};

export default heroSection;