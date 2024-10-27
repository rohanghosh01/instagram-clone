import { Loader } from "lucide-react";
import { NextPage } from "next";

interface Props {
  loading: boolean;
  text: string;
}

const LoadingButton: NextPage<Props> = ({ loading, text }) => {
  return (
    <div className="flex justify-center items-center h-6">
      {loading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default LoadingButton;
