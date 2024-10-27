"use client";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/userSlice";
import LoadingButton from "../loading-btn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRootContext } from "@/context/rootContext";
interface Props {}

const VerifyForm: NextPage<Props> = ({}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(40); // 40 seconds cooldown
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const dispatch = useAppDispatch();
  const { setLoading: setMainLoading } = useRootContext();

  // Handle countdown timer for resending OTP
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMainLoading(true);
    try {
      if (!email) throw new Error("Email is required");
      const res = await axios.post("/api/auth/verify", { otp: code, email });
      dispatch(setUser(res.data?.user));
      setLoading(false);
      setMainLoading(false);
      router.push("/");
      setErrorMessage("");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.response?.data?.error || "Internal issue");
      setLoading(false);
      setMainLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown === 0) {
      try {
        await axios.post("/api/auth/resend", { email: email });
        toast("Resend otp successful. Please check your email for the OTP.");
        setResendCooldown(40); // Reset cooldown to 40 seconds
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!email) redirect("/accounts");

  return (
    <>
      <div className="flex text-center flex-col justify-center mb-3 gap-5">
        <span className="text-base font-semibold">Enter Confirmation Code</span>
        <span className=" text-base">
          Enter the confirmation code we sent to {email}.{" "}
          <button
            className={cn(
              "text-blue-500 font-semibold",
              resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
            )}
            onClick={handleResend}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0
              ? `Resend Code in ${resendCooldown}s`
              : "Resend Code"}
          </button>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4 h-10 flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          type="submit"
          className={cn(
            "w-full py-1 rounded-md mb-3  text-white",
            code ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300"
          )}
          disabled={!code || loading}
        >
          <LoadingButton loading={loading} text="Submit" />
        </button>
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <div className="text-center text-base">
          <Link
            href="/accounts/signup"
            className="text-blue-500 font-semibold "
          >
            Go back
          </Link>
        </div>
      </form>
    </>
  );
};

export default VerifyForm;
