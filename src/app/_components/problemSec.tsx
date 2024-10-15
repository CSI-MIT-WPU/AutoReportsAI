"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { BarChart2, Timer, Wrench } from "lucide-react";
import React from "react";

const ProblemSec = () => {

    return (
        <section className="w-4/5 flex flex-col items-center mx-auto space-y-24 py-24">
            <div className="text-center">
                <p className="dark:text-white">PROBLEM</p>
                <h2 className="text-5xl font-semibold text-black dark:text-white">Manually entering your data is a hassle.</h2>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-20 space-y-12 md:space-y-0 my-12">
                <BlurFade delay={0.25 * 2} inView>
                    <div className="flex flex-col space-y-3">
                        <Timer className="h-10 w-10" />
                        <div className="text-2xl font-semibold">Data Overload</div>
                        <p className="text-base text-slate-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita magni, nam velit ducimus sunt id dolores. Soluta, suscipit iusto?
                        </p>
                    </div>
                </BlurFade>
                <BlurFade delay={0.25 * 3} inView>
                    <div className="flex flex-col space-y-3">
                        <Wrench className="h-10 w-10" />
                        <div className="text-2xl font-semibold">Slow Decision-Making</div>
                        <p className="text-base text-slate-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita magni, nam velit ducimus sunt id dolores. Soluta, suscipit iusto?
                        </p>
                    </div>
                </BlurFade>
                <BlurFade delay={0.25 * 4} inView>
                    <div className="flex flex-col space-y-3">
                        <BarChart2 className="h-10 w-10" />
                        <div className="text-2xl font-semibold">Data Security Concerns</div>
                        <p className="text-base text-slate-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita magni, nam velit ducimus sunt id dolores. Soluta, suscipit iusto?
                        </p>
                    </div>
                </BlurFade>
            </div>

        </section>
    );
};

export default ProblemSec;
