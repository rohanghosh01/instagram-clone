"use client";
import {
  Home,
  Compass,
  PlusSquare,
  MessageCircle,
  User,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SingleNav from "./nav";
import { MoreDropdown } from "./more-dropdown";

export default function MobileNav() {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: PlusSquare, label: "Create", path: "/create" },
    { icon: MessageCircle, label: "Messages", badge: 3, path: "/messages" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 py-2 px-4 border-t z-10 bg-white dark:bg-black">
      <ul className="flex justify-between items-center">
        {navItems.map((item, index) => (
          <li key={index}>
            <SingleNav item={item} isMobile />
          </li>
        ))}
        <li>
          <Button variant="ghost" size="icon" className=" p-0">
            <Avatar className="h-6 w-6">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">Profile</span>
          </Button>
        </li>
        <li>
          <MoreDropdown>
            <Button
              variant="ghost"
              className="w-full justify-start min-[1236px]:mt-14 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0"
            >
              <Menu className="h-6 w-5 min-[1236px]:mr-3" />
              <span className="hidden min-[1236px]:inline-flex">More</span>
            </Button>
          </MoreDropdown>
        </li>
      </ul>
    </nav>
  );
}
