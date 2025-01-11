"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRootContext } from "@/context/rootContext";
import * as API from "../../services/api";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function ProfileEditForm() {
  const [profile, setProfile] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [showButton, setShowButton] = useState(false);
  const { setLoading, isLoading } = useRootContext();
  const { username }: any = useParams();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const formData = new FormData();
  // Fetch user data
  const getUser = async () => {
    try {
      setLoading(true);
      const response: any = await API.profile(null, username);

      const { result } = response;
      setPreview(result?.profileImage);
      setProfile(result);
      setLoading(false);
    } catch (error: any) {
      console.log("error get user", error);
      setLoading(false);
      // throw new Error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "profileImage") {
      const input = e.target as HTMLInputElement;
      if (!input.files?.length) {
        return;
      }
      const file = input.files[0];
      setPreview(URL.createObjectURL(file));
      setUploadFile(file);
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
    setShowButton(true);
  };

  const handleSelectChange = (value: string) => {
    setProfile({ ...profile, gender: value });
    setShowButton(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profileData = {
        ...profile,
      };
      setLoading(true);
      if (uploadFile) {
        const response: any = await axios.post("/api/upload", formData);
        const url = response?.data?.results?.[0]?.url;
        profileData.profileImage = url;
      }

      console.log(">profileData>", profileData);
      await API.updateProfile(profileData);
      toast.success("Profile updated");
      setLoading(false);
      setShowButton(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      // Handle error
    }
    // Here you would typically send the data to your backend
  };

  if (!profile && isLoading) {
    return (
      <div className="h-screen flex flex-col gap-1 justify-center items-center w-full">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Edit profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col w-full sm:flex-row items-center gap-4 rounded-xl p-2">
            <div className="flex items-center flex-col w-full justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={preview}
                    alt="Profile picture"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {profile?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-blue-600 relative cursor-pointer text-sm">
                Upload photo
                <input
                  type="file"
                  className="absolute left-0 opacity-0 w-20 cursor-pointer"
                  onChange={handleInputChange}
                  name="profileImage"
                />
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              name="name"
              value={profile?.name}
              onChange={handleInputChange}
              placeholder="Name"
              // className="text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              UserName
            </label>
            <Input
              name="username"
              value={profile?.username}
              onChange={handleInputChange}
              className="font-medium"
            />
            <p className="text-xs text-muted-foreground">
              You can change your username once in 30 days.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="about" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="about"
              name="about"
              value={profile?.about}
              onChange={handleInputChange}
              placeholder="Bio"
              className="resize-none"
              maxLength={150}
            />
            <div className="text-xs text-muted-foreground text-right">
              {profile?.about?.length || 0} / 150
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender
            </label>
            <Select
              onValueChange={handleSelectChange}
              defaultValue={profile?.gender}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This won&apos;t be part of your public profile.
            </p>
          </div>

          <Button
            type="submit"
            className="float-end bg-blue-500 hover:bg-blue-600 text-white "
            disabled={!showButton}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
