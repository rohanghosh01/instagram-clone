"use client";
import CreateStory from "@/components/home/stories/story-creater";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store";
import { NextPage } from "next";
import { useState, useRef } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const file = useAppSelector((state) => state.story.storyFiles);

  if (!file) {
    return null;
  }

  return (
    <div className="w-full z-50 bg-white dark:bg-black h-[100%] max-sm:h-[85%] max-sm:mt-16">
      <CreateStory photo={file} />
    </div>
  );
};

export default Page;
