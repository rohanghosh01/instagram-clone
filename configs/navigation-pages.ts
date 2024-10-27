import {
  Home,
  Search,
  Compass,
  Heart,
  SquarePlus,
  AtSign,
  Menu,
} from "lucide-react";
export interface NavProps {
  name: string;
  url: string;
  Icon?: any;
  iconUrl?: any;
  active: boolean;
  style?: string;
}
export const navigation: NavProps[] = [
  {
    name: "Home",
    url: "/",
    Icon: Home,
    active: true,
  },
  {
    name: "Search",
    url: "/",
    Icon: Search,
    active: false,
  },
  {
    name: "Explore",
    url: "/explore",
    Icon: Compass,
    active: false,
  },
  {
    name: "Reels",
    url: "/reels",
    iconUrl: "/images/icons/reel.png",
    active: false,
    style: "w-6 h-6",
  },
  {
    name: "Messages",
    url: "/message",
    iconUrl: "/images/icons/message.png",
    active: false,
    style: "w-7 h-7",
  },
  {
    name: "Notifications",
    url: "/",
    Icon: Heart,
    active: false,
  },
  {
    name: "Messages",
    url: "/message",
    Icon: Heart,
    active: false,
  },
  {
    name: "Create",
    url: "/",
    Icon: SquarePlus,
    active: false,
  },
];

export const navigationBottom: NavProps[] = [
  {
    name: "Treads",
    url: "",
    Icon: AtSign,
    active: false,
  },
  {
    name: "More",
    url: "",
    Icon: Menu,
    active: false,
  },
];
