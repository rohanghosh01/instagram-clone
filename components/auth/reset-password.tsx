import { NextPage } from "next";
import ResetPasswordForm from "../forms/reset-password-form";
import Link from "next/link";
import Image from "next/image";

interface Props {}

const ResetPassword: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="px-10 pb-6 rounded-md w-[24rem] border-[1px]">
        <div className="cursor-pointer flex justify-center mb-3 overflow-visible">
          <Image
            src="/images/lock.png"
            alt="lock.jpg"
            className="w-[175px] h-full  dark:filter dark:invert dark:bg-none"
            width={1000}
            height={1000}
            loading="lazy"
          />
        </div>
        <div className="flex text-center flex-col justify-center mb-3">
          <span className="text-base font-semibold">Trouble logging in?</span>
          <span className="text-muted-foreground text-sm">
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </span>
        </div>
        <ResetPasswordForm />
      </div>
      <div className="text-center flex justify-center items-center text-sm border-[1px] w-full h-14 mt-2 cursor-pointer">
        <span className="font-semibold text-normal text-foreground hover:text-gray-500">
          <Link href="/accounts/login"> Back to login</Link>
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
