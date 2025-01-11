import VerifyCard from "@/components/auth/verify-card";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Verify • Instagram",
};

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <div className="w-full flex justify-center mt-4">
      <VerifyCard />
    </div>
  );
};

export default Page;
