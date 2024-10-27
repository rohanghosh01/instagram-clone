"use client";

import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import {
  X,
  Image as ImageIcon,
  ArrowLeft,
  Plus,
  Smile,
  MapPin,
  Loader,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import CarouselComponent from "@/components/carousel-content";
import { Card } from "@/components/ui/card";

import { TooltipComponent } from "@/components/tooltip-provider";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import LocationSearch from "./location-serach";
import Header from "./header";
import axios from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { addPost, refetchPost } from "@/store/postSlice";
import { AvatarProvider } from "@/components/avatar-provider";
const MAX_CHAR_LIMIT = 2200;
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FileProps {
  url: string;
  file: File;
  type: "image" | "video" | "application" | any;
}

const NewPost: NextPage<Props> = ({ open, setOpen }) => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [step, setStep] = useState(1);
  const [settingsValues, setSettingValues] = useState<any>({
    hideLikeAndView: false,
    hideComments: false,
  });

  const [text, setText] = useState<string>("");
  const [location, setLocation] = useState("");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;

    // Truncate to the maximum character limit
    if (value.length > MAX_CHAR_LIMIT) {
      value = value.substring(0, MAX_CHAR_LIMIT);
    }

    setText(value); // Set the truncated value
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    let filesData = acceptedFiles.map((file) => {
      return {
        type: file.type.split("/")[0],
        url: URL.createObjectURL(file),
        file,
      };
    });

    setStep(2);

    setFiles((prev) => [...prev, ...filesData]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleSubmit = async () => {
    if (!files.length) {
      return;
    }
    const data = {
      description: text,
      settings: settingsValues,
      location,
      media: [],
    };

    const formData = new FormData();

    // Append each file from the files array to FormData
    files.forEach(({ file }) => {
      formData.append("file", file); // append the actual file object
    });
    try {
      const response = await axios.post("/api/upload", formData);
      data.media = response.data.results;

      const dbResult = await axios.post("/api/post", data);
      const addData = {
        ...dbResult.data,
        user: {
          name: currentUser?.name,
          username: currentUser?.username,
          id: currentUser?.id,
          profileImage: currentUser?.profileImage,
        },
      };
      dispatch(addPost(addData));
      setStep(5);
      dispatch(refetchPost(true));
    } catch (error) {
      toast.error("Something went wrong");
      setOpen(false);
      console.error("Upload error:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          " max-h-[600px] l h-full p-0 overflow-hidden flex justify-center ",
          step === 3 && "md:max-w-4xl justify-start"
        )}
      >
        {step === 1 ? (
          <div className="p-2">
            <DialogTitle className="p-2 text-center">
              Create new post
            </DialogTitle>
            <div
              {...getRootProps()}
              className="rounded-lg p-8 text-center cursor-pointer mt-20"
            >
              <input {...getInputProps()} />
              <div className="flex justify-center mb-4">
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <title>
                    Icon to represent media such as images or videos
                  </title>
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">
                Drag photos and videos here
              </p>
              <Button className="mt-2 bg-blue-500 h-8 hover:bg-blue-600 text-white">
                Select from computer
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-1 flex  flex-col max-h-[500px]">
            <Header
              setFiles={setFiles}
              setStep={setStep}
              step={step}
              handleSubmit={handleSubmit}
            />

            {step === 4 ? (
              <div className="relative flex justify-center w-full h-full items-center">
                <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-l-transparent border-r-pink-500 border-b-yellow-500 animate-spin"></div>
              </div>
            ) : step == 5 ? (
              <div className="relative flex flex-col justify-center w-full h-full items-center">
                <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-pink-500 border-r-yellow-500 border-b-blue-500 border-l-purple-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-12 h-12 text-pink-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="block text-center text-white font-semibold text-lg mt-4">
                  Your post has been shared.
                </span>
              </div>
            ) : (
              <div
                className={cn(
                  "h-full w-full mt-5 relative grid grid-cols-2 justify-evenly gap-4",
                  step == 3 ? " grid-cols-2" : " grid-cols-1"
                )}
              >
                <>
                  <CarouselComponent
                    data={files}
                    className="border-0 h-full w-full flex flex-0"
                    hideDots
                    isNewChat
                  />
                  {step === 2 && (
                    <TooltipComponent title="Add more" side="left">
                      <div
                        className="rounded-full flex items-center justify-center h-8 w-8 bg-black/70 absolute bottom-2 text-white right-3 p-2 cursor-pointer"
                        {...getRootProps()}
                      >
                        <Plus className="w-5 h-5" />
                      </div>
                    </TooltipComponent>
                  )}
                </>

                {step === 3 && (
                  <Card className="w-full h-full overflow-y-scroll overflow-x-hidden p-2 border-0 outline-none bg-transparent shadow-none flex flex-col gap-2 ">
                    <div className="flex items-center gap-2">
                      <AvatarProvider
                        url={currentUser?.profileImage}
                        alt={currentUser?.name}
                        className="w-8 h-8"
                      />
                      <span className="text-primary text-sm">
                        {currentUser?.name}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <textarea
                        className="min-h-[168px] cursor-text border-0 overflow-y-auto whitespace-pre-wrap break-words outline-none resize-none p-2 bg-transparent"
                        spellCheck
                        value={text}
                        onChange={handleTextChange}
                      />
                      <div className="flex">
                        <Smile className="text-muted-foreground w-5 h-5" />
                        <TooltipComponent
                          title="Captions longer than 125 characters appear
                                truncated in feed."
                          side="left"
                        >
                          <span className="ml-auto text-muted-foreground text-sm">
                            {text.length}/{MAX_CHAR_LIMIT}
                          </span>
                        </TooltipComponent>
                      </div>
                      <LocationSearch
                        selectedLocation={location}
                        setSelectedLocation={setLocation}
                      />

                      <div className="flex">
                        <Accordion
                          type="single"
                          collapsible
                          className="w-full h-full"
                        >
                          <AccordionItem value="item-1" className="border-0">
                            <AccordionTrigger className=" appearance-none no-underline hover:no-underline">
                              Advance settings
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col gap-3">
                                <div className="flex  flex-col">
                                  <div className="flex items-center py-2">
                                    <span className="flex-1 text-base leading-5">
                                      Hide like and view counts on this post
                                    </span>

                                    <Switch
                                      checked={settingsValues.hideLikeAndView}
                                      onCheckedChange={() =>
                                        setSettingValues({
                                          hideLikeAndView:
                                            !settingsValues.hideLikeAndView,
                                          hideComments:
                                            settingsValues.hideComments,
                                        })
                                      }
                                    />
                                  </div>
                                  <span className="text-xs">
                                    Only you will see the total number of likes
                                    and views on this post. You can change this
                                    later by going to the ··· menu at the top of
                                    the post. To hide like counts on other
                                    people's posts, go to your account settings.
                                    Learn more
                                  </span>
                                </div>
                                <div className="flex  flex-col">
                                  <div className="flex items-center py-2">
                                    <span className="flex-1 text-base leading-5">
                                      Turn off commenting
                                    </span>

                                    <Switch
                                      checked={settingsValues.hideComments}
                                      onCheckedChange={() =>
                                        setSettingValues({
                                          hideLikeAndView:
                                            settingsValues.hideLikeAndView,
                                          hideComments:
                                            !settingsValues.hideComments,
                                        })
                                      }
                                    />
                                  </div>
                                  <span className="text-xs">
                                    You can change this later by going to the
                                    ··· menu at the top of your post.
                                  </span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewPost;
