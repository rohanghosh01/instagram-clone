"use client";
import { ReelsSvg } from "@/components/icons/reels";
import ProfilePost from "@/components/profile/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerifiedSvg from "@/components/Verified";
import { useRootContext } from "@/context/rootContext";
import axios from "axios";
import {
  MoreHorizontal,
  MessageCircle,
  UserPlus2,
  SettingsIcon,
  Grid3x3Icon,
  Contact,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: PageProps) {
  const stats = [
    { label: "posts", value: "3,841" },
    { label: "followers", value: "92.1M" },
    { label: "following", value: "791" },
  ];
  const { setLoading } = useRootContext();

  const [profileData, setProfileData] = useState<any>(null);
  // Fetch user data
  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/${params.username}`);
      const { result } = response.data;
      setProfileData(result);
      setLoading(false);
    } catch (error: any) {
      console.log("error get user", error);
      setLoading(false);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const handleTabChange = (tab: string) => {
    router.push(`?tab=${tab}`);
  };
  return (
    <div className="ml-0 sm:ml-20 min-[1236px]:ml-64 p-4 overflow-auto overflow-x-hidden w-full flex z-10 sm:mt-0 mt-12">
      <div className="flex flex-col gap-8 items-center md:gap-12 w-full">
        <div className="flex gap-0 md:gap-20 mt-3">
          {/* profile section */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center md:items-start gap-4">
              {/* profileImage */}
              <div className="flex items-center md:items-start gap-4 flex-wrap">
                <div className="relative h-20 w-20 md:h-36 md:w-36">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-1">
                    <div className="h-full w-full rounded-full border-2 border-background">
                      <Image
                        src={
                          profileData?.profileImage ||
                          "/images/default-user.png"
                        }
                        alt={profileData?.username}
                        className="rounded-full object-cover p-[2px]"
                        fill
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold">
                    {profileData?.username}
                  </h1>
                  <VerifiedSvg />
                </div>
                <div className="flex flex-col gap-4">
                  {profileData?.myAccount ? (
                    <div className="flex flex-wrap gap-2 items-center">
                      <Button className="h-7" variant="secondary">
                        Edit Profile
                      </Button>
                      <Button className="h-7" variant="secondary">
                        View archive
                      </Button>
                      <SettingsIcon />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 items-center">
                      {/* follow action buttons */}
                      <Button className="h-7" variant="secondary">
                        Following
                      </Button>
                      <Button variant="secondary" className="h-7">
                        Message
                      </Button>
                      <Button variant="secondary" size="icon" className="h-7">
                        <UserPlus2 className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {/* followers and followings */}
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-8">
                      <div className="flex gap-1 items-baseline">
                        <strong className="font-medium">
                          {profileData?.totalPosts || 0}
                        </strong>
                        <span className="text-muted-foreground text-sm">
                          posts
                        </span>
                      </div>
                      <div className="flex gap-1 items-baseline">
                        <strong className="font-medium ">
                          {profileData?.totalFollowers || 0}
                        </strong>
                        <span className="text-muted-foreground text-sm">
                          followers
                        </span>
                      </div>
                      <div className="flex gap-1 items-baseline">
                        <strong className="font-medium">
                          {profileData?.totalFollowing || 0}
                        </strong>
                        <span className="text-muted-foreground text-sm">
                          following
                        </span>
                      </div>
                    </div>
                    {/* profile information */}
                    <div className="space-y-2">
                      <div className="font-medium">{profileData?.name}</div>
                      {/* <div className="text-sm text-muted-foreground">
                        she/her
                      </div> */}
                      <div className="text-sm">{profileData?.about}</div>
                      {/* <Link
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        linktr.ee/PriyankaChopraJonas
                      </Link> */}
                      {/* <div className="text-sm text-muted-foreground">
                        Followed by davidbeckham
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="posts"
          className="w-full max-w-6xl"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-center gap-8 rounded-none border-b bg-transparent h-12">
            <TabsTrigger
              value="posts"
              className="relative h-12 rounded-none border-none bg-transparent data-[state=active]:bg-transparent"
            >
              <Grid3x3Icon className="w-4 h-4 mx-1" />
              POSTS
              {tab === "posts" || !tab ? (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground " />
              ) : null}
            </TabsTrigger>
            <TabsTrigger
              value="reels"
              className="relative h-12 rounded-none border-none bg-transparent data-[state=active]:bg-transparent"
            >
              <ReelsSvg className="w-4 h-4 mx-1" />
              REELS
              {tab === "reels" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground " />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="tagged"
              className="relative h-12 rounded-none border-none bg-transparent data-[state=active]:bg-transparent"
            >
              <Contact className="w-4 h-4 mx-1" />
              TAGGED
              {tab === "tagged" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground " />
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6 max-sm:mb-14">
            <ProfilePost />
          </TabsContent>
          <TabsContent value="reels">
            <div className="text-center text-muted-foreground">
              No reels yet
            </div>
          </TabsContent>
          <TabsContent value="tagged">
            <div className="text-center text-muted-foreground">
              No tagged posts
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
