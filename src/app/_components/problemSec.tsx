"use client";

import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ClipboardX, RouteOff, Timer } from "lucide-react";

const ProblemSec = () => {

    return (
        <section className="w-4/5 flex flex-col items-center mx-auto space-y-24 py-24">
            <div className="text-center">
                <p className="dark:text-white">PROBLEM</p>
                <h2 className="text-5xl font-semibold text-black dark:text-white">Creating Weekly Reports is a Hassle</h2>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-20 space-y-12 md:space-y-0 my-12">
                <BlurFade delay={0.25 * 2} inView>
                    <div className="flex flex-col space-y-3">
                        <Timer className="h-10 w-10" />
                        <div className="text-2xl font-semibold">Time Consuming</div>
                        <p className="text-base text-slate-400">
                            Manually going through the list of commits across multiple repositories takes significant time and effort, especially for detailed reporting.                        
                        </p>
                    </div>
                </BlurFade>
                <BlurFade delay={0.25 * 3} inView>
                    <div className="flex flex-col space-y-3">
                        <RouteOff className="h-10 w-10" />
                        <div className="text-2xl font-semibold">Risk of missing commits</div>
                        <p className="text-base text-slate-400">
                            It’s easy to overlook or miss commits, leading to incomplete or inaccurate reports, which may misrepresent your contributions.
                        </p>
                    </div>
                </BlurFade>
                <BlurFade delay={0.25 * 4} inView>
                    <div className="flex flex-col space-y-3">
                        <ClipboardX className="h-10 w-10" />
                        <div className="text-2xl font-semibold">Lack of context</div>
                        <p className="text-base text-slate-400">
                            Simply listing commits might not adequately convey the value or context of your work, requiring additional effort to summarize or explain the impact of each commit.
                        </p>
                    </div>
                </BlurFade>
            </div>

        </section>
    );
};

export default ProblemSec;
