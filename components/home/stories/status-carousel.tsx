"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { AddStoryFile } from "@/store/storySlice";

type User = {
  id: string;
  username: string;
  imageUrl: string;
  isRead: boolean;
};

const users: User[] = [
  {
    id: "1",
    username: "rohang111",
    imageUrl: "/images/default-user.png",
    isRead: false,
  },
  {
    id: "2",
    username: "ezsnippet",
    imageUrl: "/images/default-user.png",
    isRead: true,
  },
  {
    id: "3",
    username: "puravjha",
    imageUrl: "/images/default-user.png",
    isRead: false,
  },
  {
    id: "4",
    username: "carryminati",
    imageUrl: "/images/default-user.png",
    isRead: true,
  },
  {
    id: "5",
    username: "elon_musk",
    imageUrl: "/images/default-user.png",
    isRead: false,
  },
  {
    id: "6",
    username: "hari_dhali",
    imageUrl: "/images/default-user.png",
    isRead: true,
  },
  {
    id: "8",
    username: "rolando",
    imageUrl: "/images/default-user.png",
    isRead: true,
  },
  {
    id: "9",
    username: "maxtern",
    imageUrl: "/images/default-user.png",
    isRead: true,
  },
  {
    id: "10",
    username: "technical_gruji",
    imageUrl: "/images/default-user.png",
    isRead: true,
  },
];

export default function Component() {
  const router = useRouter();
  const handleClick = (data: any) => {
    const href = `/stories/${data.username}/${data.id}`;
    router.push(href);
  };
  const dispatch = useAppDispatch();

  const handleStoryAdd = () => {
    // Add new story
    router.push("/stories/create");
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    dispatch(AddStoryFile(file));
    handleStoryAdd();
  };
  return (
    <div className="w-full h-20">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-2xl mx-auto min-[1200px]:ml-14 cursor-pointer"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="pl-2 md:pl-4 basis-1/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
            <div className="flex flex-col items-center">
              <div
                className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border p-[2px] sm:p-[3px]`}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative z-10 ">
                  <Image
                    src="/images/default-user.png"
                    alt="new"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white absolute bottom-1 right-2 bg-sky-500 rounded-full z-50 w-4 h-4 border border-muted-foreground flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className=" opacity-0 z-0 absolute w-4 h-4"
                    onChange={handleFileChange}
                  />
                  <Plus className="w-4 h-4" onClick={handleStoryAdd} />
                </div>
              </div>
              <span className=" text-xs mt-1 truncate w-full text-center">
                Your story
              </span>
            </div>
          </CarouselItem>
          {users.map((user) => (
            <CarouselItem
              key={user.id}
              className="pl-2 md:pl-4 basis-1/5 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              onClick={() => handleClick(user)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${
                    user.isRead
                      ? "border"
                      : "bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500"
                  } p-[2px] sm:p-[3px]`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <Image
                      src={user.imageUrl}
                      alt={user.username}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className=" text-xs mt-1 truncate w-full text-center">
                  {user.username}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {users.length ? (
          <>
            <CarouselPrevious className="hidden h-6 w-6 sm:flex absolute left-4 top-12 bg-white text-black hover:bg-white hover:text-black outline-none border-none" />
            <CarouselNext className="hidden h-6 w-6 sm:flex absolute right-4 top-12 bg-white text-black hover:bg-white hover:text-black outline-none border-none" />
          </>
        ) : null}
      </Carousel>
    </div>
  );
}
