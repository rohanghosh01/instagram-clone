"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MoreVertical } from "lucide-react";

export default function PostMoreDialog({}) {
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    {
      label: "Report",
      className:
        "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300",
    },
    {
      label: "Unfollow",
      className:
        "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300",
    },
    { label: "Add to favorites" },
    { label: "Go to post" },
    { label: "Share to..." },
    { label: "Copy link" },
    { label: "Embed" },
    { label: "About this account" },
    { label: "Cancel" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96 p-0">
        <nav className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full px-6 py-3 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-center ${
                item.className || "text-zinc-900 dark:text-zinc-100"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
