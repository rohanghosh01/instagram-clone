import SignupCard from "@/components/auth/signup-card";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Sign up • Instagram",
};

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <SignupCard />
    </div>
  );
};

export default Page;
