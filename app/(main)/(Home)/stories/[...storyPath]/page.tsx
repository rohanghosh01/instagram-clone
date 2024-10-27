"use client";
import StoriesComponent from "@/components/home/stories";
import { NextPage } from "next";
import { Loader, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { storyPath } = useParams();
  const router = useRouter();
  const handleClose = () => {
    router.push("/");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-full z-50  relative">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loader className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <StoriesComponent />
      )}

      <X
        className=" absolute right-4 top-6 max-sm:top-16 w-8 h-8 cursor-pointer"
        onClick={handleClose}
      />
    </div>
  );
};

export default Page;
