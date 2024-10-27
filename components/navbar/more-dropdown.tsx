import {
  AtSign,
  Bookmark,
  LogOut,
  MessageSquareWarning,
  Moon,
  Settings,
  SquareActivity,
  Sun,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { useTheme } from "next-themes";
import axios from "axios";

export function MoreDropdown({ children }: { children: ReactNode }) {
  const { setTheme, theme } = useTheme();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.assign("/accounts");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-3">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            <SquareActivity className="mr-2 h-4 w-4" />
            <span>Your activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Saved</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="p-3">
              {theme === "dark" ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}

              <span>Switch appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light mode</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="p-3">
            <MessageSquareWarning className="mr-2 h-4 w-4" />
            <span>Report a problem</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3">
          <AtSign className="mr-2 h-4 w-4" />
          <span>Threads</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3">
          <span>Switch accounts</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
