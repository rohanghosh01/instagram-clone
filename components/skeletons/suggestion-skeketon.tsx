import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SuggestionCardSkeleton() {
  const skeletonItems = Array(5).fill(null);

  return (
    <div className="z-20 text-foreground p-4 overflow-visible flex w-full">
      <div className="max-w-full">
        <div className="">
          <ul className="space-y-3 w-full">
            {skeletonItems.map((_, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />

                  <div className="p-2">
                    <Skeleton className="w-60 h-4 mb-1" />
                    <Skeleton className="w-40 h-3" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
