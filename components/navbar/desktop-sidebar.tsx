"use client";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Menu,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import React, { useState } from "react";
import SingleNav from "./nav";
import { MoreDropdown } from "./more-dropdown";
import Link from "next/link";

export interface NavItem {
  icon: any;
  label: string;
  badge?: number;
  path: string;
}

export default function Sidebar() {
  const menuItems: NavItem[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Film, label: "Reels", path: "/reels" },
    { icon: MessageCircle, label: "Messages", path: "/messages", badge: 3 },
    { icon: Heart, label: "Notifications", path: "/notifications" },
    { icon: PlusSquare, label: "Create", path: "/create" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="flex flex-col h-screen bg-background border-r w-full">
      <div className="flex-shrink-0">
        <Link href="/">
          <div className="px-5 py-2 flex items-center justify-center min-[1236px]:justify-start mt-5 mb-5">
            <Instagram className="h-6 w-6 min-[1236px]:hidden" />
            <Image
              src="/images/Instagram-logo-text.png"
              alt="Instagram-logo-text.png"
              className="w-[7rem] h-full dark:filter dark:invert hidden min-[1236px]:block text-2xl font-bold"
              width={1000}
              height={1000}
              loading="lazy"
            />
          </div>
        </Link>

        <ScrollArea className="flex-1 py-2 max-lg:mt-10">
          <nav className="grid gap-2 max-md:gap-1 px-2 max-lg:justify-center">
            {menuItems.map((item, i: number) => (
              <React.Fragment key={i}>
                <SingleNav item={item} />
              </React.Fragment>
            ))}

            <MoreDropdown>
              <Button
                variant="ghost"
                className="w-full justify-start min-[1236px]:mt-14 mt-[3rem] focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0"
              >
                <Menu className="h-6 w-5 min-[1236px]:mr-3" />
                <span className="hidden min-[1236px]:inline-flex">More</span>
              </Button>
            </MoreDropdown>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
