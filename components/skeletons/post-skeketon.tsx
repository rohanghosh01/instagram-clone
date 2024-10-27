import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PostSkeleton() {
  return (
    <div className="overflow-hidden w-auto flex items-center justify-center max-sm:justify-start p-4 max-sm:pr-8">
      <Card className="w-full max-w-md border-x-0 border-t-0 rounded-none">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-12 h-4" />
              <Skeleton className="w-6 h-4" />
              <Skeleton className="w-12 h-4" />
            </div>
          </div>

          <div className="relative aspect-square border">
            <Skeleton className="w-full h-full" />
          </div>

          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>

            <div>
              <Skeleton className="w-24 h-5" />
            </div>

            <div>
              <Skeleton className="w-48 h-5" />
            </div>

            <Skeleton className="w-32 h-5" />

            <div className="flex items-center">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-8 h-8 ml-2 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
