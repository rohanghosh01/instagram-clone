import { NextPage } from "next";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import VideoPost from "./home/video";
import { cn } from "@/lib/utils";

interface Props {
  data: any;
  className?: string;
  hideDots?: boolean;
  isNewChat?: boolean;
}

const CarouselComponent: NextPage<Props> = ({
  data,
  className,
  hideDots,
  isNewChat,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={cn("relative aspect-auto border", className)}>
      <Carousel
        className="w-full h-full"
        opts={{
          align: "start",
          loop: false,
        }}
        setApi={setApi}
      >
        <CarouselContent
          className={cn(
            "h-full flex ",
            isNewChat ? "items-start" : "items-center"
          )}
        >
          {data?.map(({ url, type }: any, index: number) => (
            <CarouselItem key={index} className="h-full">
              {type == "image" ? (
                <Image
                  src={url}
                  alt="post_content"
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className={cn("object-cover transition-all h-full w-full",isNewChat && 'max-h-[30rem] max-w-[30rem]')}
                  placeholder="blur"
                  blurDataURL={url}
                />
              ) : (
                <VideoPost url={url} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {data?.length > 1 && (
          <>
            <CarouselPrevious className="hidden h-6 w-6 sm:flex absolute left-4 top-1/2 bg-white text-black hover:bg-white hover:text-black outline-none border-none" />

            <CarouselNext className="hidden h-6 w-6 sm:flex absolute right-4 top-1/2 bg-white text-black hover:bg-white hover:text-black outline-none border-none" />
          </>
        )}
      </Carousel>
      {data?.length > 1 && !hideDots && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {data?.map((_: any, index: number) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                current === index + 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
