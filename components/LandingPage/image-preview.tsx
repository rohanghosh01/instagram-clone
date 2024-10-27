"use client";
import { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {}

const ImagePreview: NextPage<Props> = ({}) => {
  const images = [
    "/images/LandingPage/screenshot1.png",
    "/images/LandingPage/screenshot2.png",
    "/images/LandingPage/screenshot3.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Duration for transition effect
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId);
  }, [nextIndex, images.length]);

  return (
    <div className="relative">
      <Image
        src="/images/LandingPage/home-phones.png"
        alt="preview-frame"
        className="z-50 h-[581.15px] w-full"
        width={1000}
        height={1000}
        loading="lazy"
      />
      <Image
        src={images[nextIndex]}
        alt="preview-image"
        width={1000}
        height={1000}
        loading="lazy"
        className={`absolute top-5 left-[8.9rem] h-[490px] w-[230px] transition-all duration-1000 ease-in transform ${
          isTransitioning ? "opacity-30" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default ImagePreview;
