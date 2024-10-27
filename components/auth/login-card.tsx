import { NextPage } from "next";
import GetAppComponent from "./get-app";
import LoginForm from "../forms/login-form";
import Link from "next/link";
import Image from "next/image";

interface Props {}

const LoginCard: NextPage<Props> = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-10 py-6 rounded-md w-[22rem] border-[1px]">
        <div className="cursor-pointer flex justify-center mb-3 overflow-visible">
          <Image
            src="/images/Instagram-logo-text.png"
            alt="Instagram-logo-text.png"
            className="w-[175px] h-full dark:filter dark:invert"
            width={200}
            height={1000}
            loading="lazy"
          />
        </div>
        <LoginForm />
      </div>
      <div className="text-center flex justify-center items-center text-sm border-[1px] w-full h-14 mt-2">
        Don't have an account?{" "}
        <Link
          href="/accounts/signup"
          className="text-blue-600 text-sm font-semibold ml-1"
        >
          Sign up
        </Link>
      </div>
      <GetAppComponent />
    </div>
  );
};

export default LoginCard;
