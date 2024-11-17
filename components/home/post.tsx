"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import CarouselComponent from "../carousel-content";
import { PostProps } from "@/types/postType";
import { formatDate } from "@/lib/format-date";
import { AvatarProvider } from "../avatar-provider";
import PostMoreDialog from "./post-more-dialog";
import { useRouter } from "next/navigation";

export default function Post({ data }: { data: PostProps }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const router = useRouter();
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedText = data?.description.slice(0, 100);

  const toggleLike = () => setIsLiked(!isLiked);
  const handleProfileClick = () => {
    // Open profile modal
    router.push(`/${data.user.username}?tab=posts`);
  };

  return (
    <div className="overflow-hidden w-auto flex items-center justify-center max-sm:justify-start p-4 max-sm:pr-8">
      <Card className="w-full max-w-md border-x-0 border-t-0 rounded-none">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div onClick={handleProfileClick} className=" cursor-pointer">
                <AvatarProvider
                  url={data?.user?.profileImage || ""}
                  alt={data?.user?.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <div className="flex flex-col justify-start">
                <div className="flex items-center gap-2">
                  <span
                    className="font-semibold text-sm cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    {data?.user?.username}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    • {formatDate(data?.createdAt)}
                  </span>
                  <span className="text-sm"> • </span>
                  <Button className="text-blue-500 hover:text-primary appearance-none no-underline bg-transparent hover:bg-transparent h-4 text-sm w-6">
                    Follow
                  </Button>
                </div>
                <span className="text-xs">{data.location}</span>
              </div>
            </div>
            <PostMoreDialog />
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-black dark:text-white"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button> */}
          </div>

          <CarouselComponent data={data?.media} />

          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLike}
                  className="p-0"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "text-red-500 fill-current" : ""
                    }`}
                  />
                </Button>
                <Button variant="ghost" size="icon" className="p-0">
                  <MessageCircle className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="p-0">
                  <Send className="w-6 h-6" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="p-0">
                <Bookmark className="w-6 h-6" />
              </Button>
            </div>

            <div>
              <span className="font-semibold">{data?.totalLikes} likes</span>
            </div>

            {data?.description && (
              <div>
                <span className="font-semibold mr-1">
                  {data?.user?.username}
                </span>

                {/* Truncated text with "more" inline */}
                <span className="ml-1 text-gray-900 dark:text-gray-300">
                  {isExpanded || data.description.length < 100 ? (
                    <>
                      {data.description} {/* Full description when expanded */}
                    </>
                  ) : (
                    <>
                      {truncatedText}...
                      <button
                        className="text-muted-foreground ml-1"
                        onClick={toggleDescription}
                      >
                        more
                      </button>
                    </>
                  )}
                </span>
              </div>
            )}

            {data?.totalComments ? (
              <div className="text-gray-500 dark:text-gray-400">
                View all {data?.totalComments} comments
              </div>
            ) : null}

            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Add a comment..."
                className="flex-grow bg-transparent focus:outline-none dark:text-white border-none p-0"
              />
              <Button variant="ghost" size="sm" className="text-gray-400">
                😊
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
