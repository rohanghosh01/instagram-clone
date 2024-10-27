"use client";
import { NextPage } from "next";
import { Button } from "../ui/button";
import { NavItem } from "./desktop-sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NewPost from "../home/newPost";
import { useAppDispatch } from "@/store";
import { refetchPost } from "@/store/postSlice";

interface Props {
  item: NavItem;
  isMobile?: boolean;
}

const SingleNav: NextPage<Props> = ({ item, isMobile }) => {
  const [currentPath, setCurrentPath] = useState("/");
  const router = useRouter();
  const pathname = usePathname();
  const [newPostOpen, setNewPostOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleClick = (path: string) => {
    if (path == "/create") {
      setNewPostOpen(true);
    } else {
      if (path == "/") {
        router.push("/"); // Navigate to home page when navigating to home page
        dispatch(refetchPost(true)); // Reset the isNewPost state
      } else {
        router.push(path);
      }
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        onClick={() => handleClick(item?.path)} // Set active item on click
        className={cn(
          "w-full justify-start relative flex focus-visible:ring-0 focus:outline-none",
          !isMobile &&
            currentPath === item.path &&
            "bg-gray-100 dark:bg-gray-700" // Apply active styling
        )}
      >
        <div className="relative">
          <item.icon className="h-6 w-6 min-[1236px]:mr-3" />
          {item.badge && (
            <span className="absolute top-1 right-1 min-[1236px]:right-4 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white dark:border-black">
              {item.badge}
            </span>
          )}
        </div>
        <span className="hidden min-[1236px]:inline-flex">{item.label}</span>
      </Button>

      {newPostOpen && <NewPost open={newPostOpen} setOpen={setNewPostOpen} />}
    </>
  );
};

export default SingleNav;
