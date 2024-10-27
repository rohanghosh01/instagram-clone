import { NextPage } from "next";
import GetAppComponent from "./get-app";
import Link from "next/link";
import Image from "next/image";
import VerifyForm from "../forms/verify-form";

interface Props {}

const VerifyCard: NextPage<Props> = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-10 py-6 rounded-md w-[22rem] border-[1px]">
        <div className="cursor-pointer flex justify-center mb-3 overflow-visible">
          <Image
            src="/images/verify.png"
            alt="verify.png"
            className="w-[175px] h-full"
            width={1000}
            height={1000}
            priority={true}
          />
        </div>
        <VerifyForm />
      </div>
      <div className="text-center flex justify-center items-center text-sm border-[1px] w-full h-14 mt-2">
        Have an account?{" "}
        <Link
          href="/accounts/login"
          className="text-blue-600 text-sm font-semibold ml-1"
        >
          Log in
        </Link>
      </div>
      <GetAppComponent />
    </div>
  );
};

export default VerifyCard;
