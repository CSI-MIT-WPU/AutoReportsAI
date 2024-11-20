"use client";
import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

function HeroVid() {
  return (
    <BlurFade delay={0.25 * 5} inView>
      <div className="relative w-full flex flex-col items-center justify-center">
        <HeroVideoDialog
          className="dark:hidden block w-4/5"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/0YueJwvDsoo?si=gUKMxmE-zoOwMR1s"
          thumbnailSrc="/dashboard.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block w-4/5"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/0YueJwvDsoo?si=gUKMxmE-zoOwMR1s"
          thumbnailSrc="/dashboard.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </BlurFade>
  );
}

export default HeroVid;
