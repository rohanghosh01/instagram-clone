import { ReelsSvg } from "@/components/icons/reels";
import useVideoThumbnail from "@/hooks/video-thumbnail-converter";
import { PostProps } from "@/types/postType";
import { Heart, ImagesIcon, MessageCircleIcon } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  item: PostProps;
}

const Post: NextPage<Props> = ({ item }) => {
  const [media, setMedia] = useState<{
    url: string | "";
    type: string | "";
  }>({
    url: "",
    type: "",
  });

  const { thumbnail, videoRef } = useVideoThumbnail({
    videoSrc: media.url as string,
    seekTime: 1,
  });

  useEffect(() => {
    if (item.media && item.media.length > 0) {
      setMedia(item.media[0]);
    }
    if (videoRef?.current) {
      videoRef.current.load();
    }
  }, [videoRef, item]);

  if (media.type == "image") {
    return (
      <div className="p-0 m-0 w-full h-full group cursor-pointer relative">
        {item.media.length > 1 && (
          <div className=" absolute right-2 top-3">
            <ImagesIcon />
          </div>
        )}
        <Image
          src={media.url || "/images/default-user.png"}
          alt="Post"
          width={300}
          height={300}
          className="h-full w-full object-cover group-hover:opacity-40"
        />
        <div className="hidden group-hover:flex items-center  absolute h-full w-full top-0 justify-center gap-4">
          <div className="text-lg font-bold flex items-center gap-3">
            <Heart className="w-5 h-5 fill-white" />
            <span>{item?.totalLikes}</span>
          </div>
          <div className="text-lg font-bold flex items-center gap-3">
            <MessageCircleIcon className="w-5 h-5 fill-white" />
            <span>{item?.totalComments}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <video
          ref={videoRef || "/test.mp4"}
          src={media?.url || ""}
          crossOrigin="anonymous"
          style={{ display: "none" }}
        />
        <div className="p-0 m-0 w-full h-full group cursor-pointer relative">
          <div className=" absolute right-2 top-3">
            <ReelsSvg />
          </div>
          <Image
            src={(thumbnail as string) || "/images/default-user.png"}
            alt="Post"
            width={300}
            height={300}
            className="h-full w-full object-cover group-hover:opacity-40"
          />
          <div className="hidden group-hover:flex items-center  absolute h-full w-full top-0 justify-center gap-4">
            <div className="text-lg font-bold flex items-center gap-3">
              <Heart className="w-5 h-5 fill-white" />
              <span>{item?.totalLikes}</span>
            </div>
            <div className="text-lg font-bold flex items-center gap-3">
              <MessageCircleIcon className="w-5 h-5 fill-white" />
              <span>{item?.totalComments}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Post;
