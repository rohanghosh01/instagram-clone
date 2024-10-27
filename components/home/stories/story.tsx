import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import ImageWithDominantColor from "./image-color-bg";
import { getDominantColor } from "@/lib/getDominantColor";
import { cn } from "@/lib/utils";

interface Story {
  id: number;
  imageUrl: string;
  duration: number;
  hasAudio: boolean;
}

const stories: Story[] = [
  { id: 1, imageUrl: "/images/my-pic.jpg", duration: 15, hasAudio: true },
  { id: 2, imageUrl: "/images/microsoft.png", duration: 15, hasAudio: false },
  {
    id: 3,
    imageUrl: "/images/Instagram-logo-text.png",
    duration: 15,
    hasAudio: true,
  },
];

export default function Story() {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(intervalRef.current!);
            if (currentStory < stories.length - 1) {
              setCurrentStory((prev) => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prevProgress + 100 / (stories[currentStory]?.duration * 10);
        });
      }, 100);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentStory, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    (async () => {
      const color: any = await getDominantColor(
        stories[currentStory]?.imageUrl
      );
      let bg = `bg-[rgba(${color.join(",")})]`;
      console.log(">>", bg);
      setBgColor(bg);
    })();
  }, [currentStory]);

  return (
    <div
      className={cn(
        "relative h-full w-full rounded-md p-4",
        bgColor ? bgColor : ""
      )}
    >
      <div className="absolute z-20 top-2 left-0 right-0 flex ">
        {stories.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-[0.1rem] bg-muted-foreground mx-1"
          >
            <div
              className="h-full bg-white"
              style={{
                width: `${
                  index === currentStory
                    ? progress
                    : index < currentStory
                    ? 100
                    : 0
                }%`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="relative h-full w-full">
        <Image
          src={stories[currentStory]?.imageUrl}
          alt={`Story ${currentStory + 1}`}
          width={400}
          height={600}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute top-1 left-1 flex items-center w-full h-10 justify-start">
          <div className="flex-1 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <span className="text-white text-sm font-semibold">username</span>
            <span className="text-white text-xs">16h</span>
          </div>

          <div className="w-full h-full justify-end mr-2 flex gap-4 ">
            {stories[currentStory]?.hasAudio && (
              <button onClick={handleMuteUnmute} className="text-white inline-block">
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            )}
            <button
              onClick={handlePlayPause}
              className="text-white inline-block"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
