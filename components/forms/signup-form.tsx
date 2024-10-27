"use client";
import { cn } from "@/lib/utils";
import { Metadata, NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginFacebook from "./login-facebook";
import LoadingButton from "../loading-btn";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRootContext } from "@/context/rootContext";

interface Props {}

interface FormValues {
  email: string;
  name: string;
  username: string;
  password: string;
}

const SignupForm: NextPage<Props> = ({}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const { setLoading: setMainLoading } = useRootContext();

  //This password is too easy to guess. Please create a new one.

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setMainLoading(true);
    try {
      const res = await axios.post("/api/auth/register", values);
      setLoading(false);
      setMainLoading(false);
      router.push(`/accounts/verify?email=${encodeURIComponent(values.email)}`);
      setErrorMessage("");
    } catch (error: any) {
      console.error(error);
      if (error?.response?.statusText == "username_exist") {
        setSuggestions(error?.response?.data?.suggestions || []);
      }
      setErrorMessage(error?.response?.data?.error || "Internal issue");
      setLoading(false);
      setMainLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue("username", suggestion); // Update the username input field with the selected suggestion
  };

  const username = watch("username");
  const email = watch("email");
  const name = watch("name");
  const password = watch("password");
  const isFormFilled = username && password && email && name;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center my-5 text-center">
        <span className="text-base font-semibold text-muted-foreground text-wrap break-words whitespace-pre-line max-w-full min-w-0">
          Sign up to see photos and videos from your friends.
        </span>
      </div>
      <LoginFacebook />
      <div className="flex justify-center items-center my-2">
        <span className="bg-gray-300 h-px flex-grow"></span>
        <span className="mx-4 text-gray-500">OR</span>
        <span className="bg-gray-300 h-px flex-grow"></span>
      </div>
      <div className="relative mb-5 h-10">
        <div className="relative border border-gray-300 rounded-[2px] px-2 py-1">
          <label
            htmlFor="email"
            className={cn(
              "absolute left-1  text-gray-500  transform -translate-y-1/2 px-1 cursor-text pointer-events-none",
              email ? "top-2 text-[10px]" : "top-5 text-sm "
            )}
          >
            Mobile Number or Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full h-5 mt-2 bg-transparent focus:outline-none text-[13px]"
            {...register("email")}
            autoComplete="email"
          />
        </div>
      </div>
      <div className="relative mb-5 h-10">
        <div className="relative border border-gray-300 rounded-[2px] px-2 py-1">
          <label
            htmlFor="name"
            className={cn(
              "absolute left-1  text-gray-500  transform -translate-y-1/2 px-1 cursor-text pointer-events-none",
              name ? "top-2 text-[10px]" : "top-5 text-sm "
            )}
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full h-5 mt-2 bg-transparent focus:outline-none text-[13px]"
            {...register("name")}
            autoComplete="name"
          />
        </div>
      </div>
      <div
        className={cn(
          "relative  h-10",
          suggestions && suggestions.length ? "mb-8" : "mb-5"
        )}
      >
        <div className="relative border border-gray-300 rounded-[2px] px-2 py-1">
          <label
            htmlFor="username"
            className={cn(
              "absolute left-1  text-gray-500  transform -translate-y-1/2 px-1 cursor-text pointer-events-none",
              username ? "top-2 text-[10px]" : "top-5 text-sm "
            )}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full h-5 mt-2 bg-transparent focus:outline-none text-[13px]"
            {...register("username")}
            autoComplete="username"
          />
        </div>
        {suggestions && suggestions.length ? (
          <div className="flex gap-2 cursor-pointer mt-2">
            <span className="text-xs">suggestions:</span>
            {suggestions.map((suggestion: string, index: number) => (
              <div
                key={index}
                className="text-blue-500 text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        ) : null}
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
      <p className="flex text-muted-foreground text-xs flex-col gap-4 text-center mb-4">
        <span>
          People who use our service may have uploaded your contact information
          to Instagram. Learn More
        </span>
        <span>
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy .
        </span>
      </p>

      <button
        type="submit"
        className={cn(
          "w-full py-1 rounded-md mb-3  text-white",
          isFormFilled ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400"
        )}
        disabled={!isFormFilled}
      >
        <LoadingButton loading={loading} text="  Sign up" />
      </button>
      {errorMessage && (
        <div className="text-center leading-5 text-sm">
          <span className="text-red-400">{errorMessage}</span>
        </div>
      )}
    </form>
  );
};

export default SignupForm;
