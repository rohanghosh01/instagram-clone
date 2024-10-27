import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export function TooltipComponent({
  title,
  children,
  side,
}: {
  title: string;
  children: ReactNode;
  side: "left" | "right" | "top" | "bottom";
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="flex items-center">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
