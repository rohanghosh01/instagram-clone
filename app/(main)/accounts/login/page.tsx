import LoginCard from "@/components/auth/login-card";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Login • Instagram",
};

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <LoginCard />
    </div>
  );
};

export default Page;
