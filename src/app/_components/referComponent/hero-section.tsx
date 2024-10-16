"use client";
import { FadeText } from "@/components/magicui/fade-text";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import { useAuth } from "@clerk/nextjs";

const HeroSection = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <section className="flex flex-col justify-center items-center h-[90dvh] overflow-hidden relative">
      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={80}
        color={color}
        refresh
      />
      <div className="text-center space-y-6 lg:w-3/5 mx-5 md:mx-20 lg:mx-0 ">
        <FadeText
          className="text-5xl md:text-6xl lg:text-7xl text-primary font-bold"
          direction="down"
          framerProps={{
            show: { transition: { duration: 1 } },
          }}
          text="Take a look on your git commits with AI"
        />
        <FadeText
          className="text-lg md:text-xl lg:text-2xl font-medium text-neutral-400 dark:text-neutral-600 "
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.3, duration: 1 } },
          }}
          text="No matter what problem you have, our AI can help you solve it."
        />
      </div>
      {isSignedIn ? (
        <Link href="/dashboard">
          <motion.div
            className="z-10 flex min-h-[7rem] items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
          >
            <ShimmerButton
              className="shadow-2xl"
              background="linear-gradient(to top left, #414d0b, #727a17)"
              shimmerSize="0.15em"
            >
              <div className="flex whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                <span className="my-auto">Get Started</span>{" "}
                <ChevronRight className="my-auto" />
              </div>
            </ShimmerButton>
          </motion.div>
        </Link>
      ) : (
        <a href="/">
          <motion.div
            className="z-10 flex min-h-[7rem] items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
          >
            <ShimmerButton
              className="shadow-2xl"
              background="linear-gradient(to top left, #414d0b, #727a17)"
              shimmerSize="0.15em"
            >
              <div className="flex whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                <span className="my-auto">Get Started</span>{" "}
                <ChevronRight className="my-auto" />
              </div>
            </ShimmerButton>
          </motion.div>
        </a>
      )}
    </section>
  );
};

export default HeroSection;
