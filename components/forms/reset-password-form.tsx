"use client";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginFacebook from "./login-facebook";
import Link from "next/link";

interface Props {}

interface FormValues {
  email: string;
}

const ResetPasswordForm: NextPage<Props> = ({}) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission, e.g., make an API call here
  };

  const email = watch("email");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-4 h-10">
        <div className="relative border border-gray-300 rounded-[2px] px-2 py-1">
          <label
            htmlFor="username"
            className={cn(
              "absolute left-1  text-gray-500  transform -translate-y-1/2 px-1 cursor-text pointer-events-none",
              email ? "top-2 text-[10px]" : "top-5 text-sm "
            )}
          >
            Email, Phone, or Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full h-5 mt-2 bg-transparent focus:outline-none text-[13px]"
            {...register("email")}
            autoComplete="username"
          />
        </div>
      </div>

      <button
        type="submit"
        className={cn(
          "w-full py-1 rounded-md mb-3  text-white",
          email ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400"
        )}
        disabled={!email}
      >
        Send login link
      </button>
      <div className="text-center text-xs">
        <Link href="">Can't reset your password?</Link>
      </div>
      <div className="flex justify-center items-center my-2">
        <span className="bg-gray-300 h-px flex-grow"></span>
        <span className="mx-4 text-gray-500">OR</span>
        <span className="bg-gray-300 h-px flex-grow"></span>
      </div>
      <div className="text-center">
        <Link
          href="/accounts/signup"
          className="font-semibold text-sm text-foreground hover:text-gray-500"
        >
          Create new account
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
