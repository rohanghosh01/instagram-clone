"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Type,
  Smile,
  Sparkles,
  Music,
  MoreHorizontal,
  X,
  Save,
  MessageSquareOff,
  Eraser,
  Palette,
  Upload,
  Bell,
  Check,
  Undo,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CreateStory({ photo }: { photo: File }) {
  const [color, setColor] = useState("#ffffff");
  const [isColor, setIsColor] = useState(false);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [emojis, setEmojis] = useState<
    { id: number; emoji: string; x: number; y: number }[]
  >([]);
  const [music, setMusic] = useState<string | null>(null);

  const addEmoji = (emoji: string) => {
    setEmojis([
      ...emojis,
      {
        id: Date.now(),
        emoji,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
    ]);
  };

  const selectMusic = (song: string) => {
    setMusic(song);
  };

  const colors = [
    "#ffffff",
    "#3b82f6",
    "#000000",
    "#84cc16",
    "#eab308",
    "#22c55e",
    "#a3e635",
    "#7c3aed",
    "#2563eb",
    "#ec4899",
  ];

  return (
    <div
      className="relative w-full h-full overflow-hidden flex justify-center items-center p-0 m-0"
      style={{ backgroundColor: color }}
    >
      {/* Main image area */}
      <div className="z-0 flex justify-center">
        <Image
          src={URL.createObjectURL(photo)}
          alt="Story background"
          className="h-full w-full max-w-md object-cover"
          height={500}
          width={500}
        />
      </div>

      {/* Text overlay */}
      {text && (
        <div
          className="absolute z-20 cursor-move"
          style={{ left: `${textPosition.x}px`, top: `${textPosition.y}px` }}
          draggable
          onDragEnd={(e) => setTextPosition({ x: e.clientX, y: e.clientY })}
        >
          <div className="relative">
            <p
              className={cn(
                "text-2xl font-bold",
                color === "#000000" && "text-white"
              )}
            >
              {text}
            </p>
            <Button
              className="w-5 h-5 p-0 rounded-full absolute -top-5 -right-3 z-50 cursor-pointer"
              variant="outline"
              onClick={() => {
                setText("");
              }}
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      )}

      {/* Emoji overlay */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute z-50 text-4xl cursor-move"
          style={{ left: `${emoji.x}px`, top: `${emoji.y}px` }}
          draggable
          onDragEnd={(e) => {
            setEmojis(
              emojis.map((em) =>
                em.id === emoji.id ? { ...em, x: e.clientX, y: e.clientY } : em
              )
            );
          }}
        >
          <div className="relative">
            {emoji.emoji}
            <Button
              className="w-5 h-5 p-0 rounded-full absolute -top-5 -right-3 z-50 cursor-pointer"
              variant="outline"
              onClick={() => {
                setEmojis(emojis.filter((em) => em.id !== emoji.id));
              }}
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}

      {/* Top bar */}

      <div className="absolute w-10 ml-auto top-0 left-0 right-8 z-30 p-4 flex justify-between ">
        <div className="flex flex-col items-end content-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Type className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Text</DialogTitle>
              </DialogHeader>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text"
              />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Smile className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emoji</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-8 gap-2">
                {["😀", "😍", "🎉", "🌈", "🔥", "🎂", "🍾", "🙂"].map(
                  (emoji) => (
                    <Button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      variant="outline"
                      size="icon"
                    >
                      {emoji}
                    </Button>
                  )
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsColor(!isColor)}
          >
            <Palette className="h-6 w-6" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Music className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Music</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {["Song 1", "Song 2", "Song 3"].map((song) => (
                  <Button
                    key={song}
                    onClick={() => selectMusic(song)}
                    variant="outline"
                    className="w-full"
                  >
                    {song}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() =>
                  console.log("Save functionality to be implemented")
                }
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() =>
                  console.log(
                    "Turn off commenting functionality to be implemented"
                  )
                }
              >
                <MessageSquareOff className="mr-2 h-4 w-4" />
                Turn off commenting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" className="rounded-full">
            Close
          </Button>
        </Link>

        <Button variant="secondary" className="rounded-full px-3">
          Add to story
        </Button>
      </div>

      {/* Color picker for drawing */}
      {isColor && (
        <div className="absolute bottom-4 max-sm:bottom-20  left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 bg-black bg-opacity-50 rounded-full p-2">
          {colors.map((clr) => (
            <Button
              key={clr}
              className={`w-8 h-8 rounded-full ${
                color === clr ? "ring-2 ring-white" : ""
              }`}
              style={{ backgroundColor: clr }}
              onClick={() => {
                setColor(clr);
              }}
            />
          ))}
        </div>
      )}

      {/* Music indicator */}
      {music && (
        <div className="absolute bottom-20 right-4 z-30 bg-black bg-opacity-50 rounded-full px-4 py-2 flex items-center">
          <Music className="h-4 w-4 mr-2" />
          <span>{music}</span>
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => setMusic(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
