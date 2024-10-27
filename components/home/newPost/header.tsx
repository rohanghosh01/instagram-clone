import { ArrowLeft } from "lucide-react";
import { NextPage } from "next";

interface Props {
  step: number;
  handleSubmit: () => void;
  setStep: (step: number) => void;
  setFiles: (files: any) => void;
}

const Header: NextPage<Props> = ({ step, handleSubmit, setStep, setFiles }) => {
  return (
    <div className="flex p-2 items-center content-center text-center">
      {step !== 4 && step !== 5 && (
        <ArrowLeft
          onClick={() => {
            let newStep = step - 1;
            if (newStep === 1) {
              setFiles([]);
            }
            setStep(newStep);
          }}
          className="w-6 h-6 cursor-pointer"
        />
      )}

      <div className="text-sm font-semibold text-center flex-1">
        {step === 4
          ? "Sharing"
          : step === 5
          ? "Post shared"
          : "Create new post"}
      </div>

      {step !== 4 && step !== 5 && (
        <div>
          {step == 2 ? (
            <span
              className=" text-blue-500 font-semibold hover:text-primary cursor-pointer mr-10 text-sm"
              onClick={() => setStep(3)}
            >
              Next
            </span>
          ) : step == 3 ? (
            <span
              className=" text-blue-500 font-semibold hover:text-primary cursor-pointer mr-10 text-sm"
              onClick={() => {
                setStep(4);
                handleSubmit();
              }}
            >
              Share
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Header;
