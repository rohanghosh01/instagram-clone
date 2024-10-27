//login form
"use client";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginFacebook from "./login-facebook";
import Link from "next/link";
import LoadingButton from "../loading-btn";
import { useFetch } from "@/hooks/use-fetch";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/userSlice";
import { useRootContext } from "@/context/rootContext";

interface Props {}

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: NextPage<Props> = ({}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { setLoading: setMainLoading } = useRootContext();
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setMainLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", values);
      dispatch(setUser(data?.user));
      setLoading(false);
      setMainLoading(false);
      router.push("/");
    } catch (error: any) {
      console.error(error);
      if (error?.response?.statusText == "email_not_verified") {
        await axios.post("/api/auth/resend", { email: values.username });
        router.push(
          `/accounts/verify?email=${encodeURIComponent(
            error?.response?.data?.email
          )}`
        );
      }
      setErrorMessage(error?.response?.data?.error || "Internal issue");
      setLoading(false);
      setMainLoading(false);
    }
  };

  const username = watch("username");
  const password = watch("password");
  const isFormFilled = username && password;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-5 h-10">
        <div className="relative border border-gray-300 rounded-[2px] px-2 py-1">
          <label
            htmlFor="username"
            className={cn(
              "absolute left-1  text-gray-500  transform -translate-y-1/2 px-1 cursor-text pointer-events-none",
              username ? "top-2 text-[10px]" : "top-5 text-sm "
            )}
          >
            Phone number, username, or email
          </label>
          <input
            type="text"
            id="username"
            className="w-full h-5 mt-2 bg-transparent focus:outline-none text-[13px]"
            {...register("username")}
            autoComplete="username"
          />
        </div>
      </div>
      <div className="relative mb-5 h-10">
        <div className="relative border border-gray-300 rounded-[2px] px-2 py-1">
          <label
            htmlFor="password"
            className={cn(
              "absolute left-1  text-gray-500  transform -translate-y-1/2 px-1 cursor-text pointer-events-none",
              password ? "top-2 text-[10px]" : "top-5 text-sm "
            )}
          >
            Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="w-full h-5 mt-2 bg-transparent focus:outline-none text-[13px]"
            {...register("password")}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm focus:outline-none font-semibold hover:text-gray-400"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className={cn(
          "w-full py-1 rounded-md mb-3  text-white text-center ",
          isFormFilled ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400"
        )}
        disabled={!isFormFilled}
      >
        <LoadingButton loading={loading} text="Log in" />
      </button>
      <div className="flex justify-center items-center my-2">
        <span className="bg-gray-300 h-px flex-grow"></span>
        <span className="mx-4 text-gray-500">OR</span>
        <span className="bg-gray-300 h-px flex-grow"></span>
      </div>
      <LoginFacebook />
      {errorMessage && (
        <div className="text-center leading-5 text-sm">
          <span className="text-red-400">{errorMessage}</span>
        </div>
      )}

      <Link
        href="/accounts/reset-password"
        className="block text-center text-xs mb-0 mt-4"
      >
        Forgot password?
      </Link>
    </form>
  );
};

export default LoginForm;
