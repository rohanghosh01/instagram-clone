import { NextPage } from "next";
import ImagePreview from "./image-preview";
import LoginCard from "../auth/login-card";

interface Props {}

const LandingPage: NextPage<Props> = ({}) => {
  return (
    <div className="flex justify-center w-full mt-6  pt-0 mb-0 pb-[32px] pr-0 shrink-0 items-stretch flex-grow ml-auto align-baseline ">
      <div className="hidden lg:block h-[581px] mb-[12px]  mr-[32px]">
        <ImagePreview />
      </div>

      <LoginCard />
    </div>
  );
};

export default LandingPage;
