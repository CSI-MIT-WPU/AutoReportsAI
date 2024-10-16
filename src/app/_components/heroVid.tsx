"use client";
import React from "react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import BlurFade from "@/components/magicui/blur-fade";

function HeroVid() {
  return (
    <BlurFade delay={0.25 * 5} inView>
      <div className="relative w-full flex flex-col items-center justify-center">
        <HeroVideoDialog
          className="dark:hidden block w-4/5"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block w-4/5"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </BlurFade>
  );
}

export default HeroVid;
