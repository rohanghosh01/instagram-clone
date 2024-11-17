import { useRef, useState, useEffect } from "react";

interface UseVideoThumbnailProps {
  videoSrc: string;
  seekTime?: number; // Optional time to seek (default to 1 second)
}

const useVideoThumbnail = ({
  videoSrc,
  seekTime = 1,
}: UseVideoThumbnailProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = document.createElement("canvas"); // Create the canvas internally

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.currentTime = seekTime;
    };

    const handleSeeked = () => {
      captureThumbnail();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [videoSrc, seekTime]);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef;

    if (video && canvas) {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        // Draw the current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the data URL of the canvas as a thumbnail image
        const image = canvas.toDataURL("image/png");
        setThumbnail(image);
      }
    }
  };

  return { thumbnail, videoRef };
};

export default useVideoThumbnail;
