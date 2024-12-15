"use client";
import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

function HeroVid() {
  const [imgURL, setImgURL] = React.useState<string | null>("https://firebasestorage.googleapis.com/v0/b/autoreportsai-f6610.appspot.com/o/assets%2Fdashboard.png?alt=media&token=241ed5ef-4ec5-4dd4-8f03-5d624138eda8");

  return (
    <BlurFade inView>
      <div className="relative w-full flex flex-col items-center justify-center">
        <HeroVideoDialog
          className="dark:hidden block w-4/5"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/0YueJwvDsoo?si=gUKMxmE-zoOwMR1s"
          thumbnailSrc={imgURL || ""}
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block w-4/5"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/0YueJwvDsoo?si=gUKMxmE-zoOwMR1s"
          thumbnailSrc={imgURL || ""}
          thumbnailAlt="Hero Video"
        />
      </div>
    </BlurFade>
  );
}

export default HeroVid;
