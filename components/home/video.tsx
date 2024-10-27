import { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import { Card } from "../ui/card";
import { Volume, Volume1, Volume2Icon, VolumeX } from "lucide-react";

interface Props {
  url: string;
}

const VideoPost: NextPage<Props> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
              setIsPlaying(true);
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <Card className="relative outline-none border-0 w-full h-full flex justify-center items-center ">
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        muted={isMuted}
        onClick={handleVideoClick}
        className="cursor-pointer"
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute bottom-4 right-4 cursor-pointer text-white rounded-full bg-muted p-1"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX className="w-4 h-4"/> : <Volume2Icon className="w-4 h-4" />}
      </div>
    </Card>
  );
};

export default VideoPost;
