"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component from shdcn

export default function StatusSkeleton() {
  const skeletonItems = Array(7).fill(null); // Adjust number of items to match your carousel length

  return (
    <div className="w-full h-20">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-2xl mx-auto min-[1200px]:ml-14"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {skeletonItems.map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <div className="flex flex-col items-center">
                <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full" />
                <Skeleton className="w-full h-4 mt-2" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden h-6 w-6 sm:flex absolute left-4 top-12 bg-white text-black hover:bg-white hover:text-black outline-none border-none" />
        <CarouselNext className="hidden h-6 w-6 sm:flex absolute right-4 top-12 bg-white text-black hover:bg-white hover:text-black outline-none border-none" />
      </Carousel>
    </div>
  );
}
