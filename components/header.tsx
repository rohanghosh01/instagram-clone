"use client";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";
import { Cross, Heart, Search, X } from "lucide-react";
import { useState } from "react";

interface Props {}

const header: NextPage<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex gap-1 justify-start items-center sm:hidden fixed top-0   w-full z-50 h-14 dark:bg-black bg-white border-b">
      <div className="">
        <Image
          src="/images/Instagram-logo-text.png"
          alt="Instagram-logo-text.png"
          className="w-32 h-full p-2 dark:filter dark:invert "
          width={1000}
          height={1000}
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-4">
        {open ? (
          <Card
            className="flex gap-3 w-48 p-1 bg-muted"
            onClick={() => setOpen(true)}
          >
            <input
              type="text"
              className="pl-1 border-0 outline-none bg-muted w-[80%]"
              placeholder="Search"
            />

            <X
              className="text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            />
          </Card>
        ) : (
          <Card
            className="flex gap-3 w-48 p-1 bg-muted"
            onClick={() => setOpen(true)}
          >
            <Search className="text-muted-foreground" />
            <span className="text-muted-foreground">Search</span>
          </Card>
        )}
        <div>
          <Heart />
        </div>
      </div>
    </header>
  );
};

export default header;
