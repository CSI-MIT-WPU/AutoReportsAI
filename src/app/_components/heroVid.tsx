"use client";
import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import getAsset from "@/server/get-asset";

function HeroVid() {
  const [imgURL, setImgURL] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchThumbnail = async () => {
      const url = await getAsset("assets/dashboard.png");
      console.log(url);
      return url;
    };
    fetchThumbnail().then((url) => {
      setImgURL(url);
    });
  }, []);

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
