import ResetPassword from "@/components/auth/reset-password";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Reset Password • Instagram",
};

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <ResetPassword />
    </div>
  );
};

export default Page;
