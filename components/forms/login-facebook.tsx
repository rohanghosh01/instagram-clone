"use client";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {}

const LoginFacebook: NextPage<Props> = ({}) => {
  let pathname = usePathname();

  return (
    <div
      className={cn(
        "w-full py-1 rounded-md mb-3  text-white",
        pathname == "/" ? "" : "bg-blue-500 hover:bg-blue-600"
      )}
    >
      <button
        type="button"
        className={cn(
          "w-full border-0 outline-none bg-none text-center p-0 text-sm flex gap-2 justify-center items-center"
        )}
      >
        <Image
          className="w-4 h-4 mt-[3px]"
          src="/images/facebook.png"
          width={1000}
          height={1000}
          loading="lazy"
          alt="facebook"
        />
        <span
          className={cn(
            " font-semibold text-sm py-[2px]",
            pathname == "/" ? "text-[#385185]" : " text-white"
          )}
        >
          Log in with Facebook
        </span>
      </button>
    </div>
  );
};

export default LoginFacebook;
