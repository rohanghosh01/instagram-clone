import { ProfileEditForm } from "@/components/profile/edit-profile";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="ml-0 sm:ml-20 min-[1236px]:ml-64 p-4 overflow-auto overflow-x-hidden w-full flex z-10 sm:mt-0 mt-12">
      <ProfileEditForm />
    </div>
  );
};

export default Page;
