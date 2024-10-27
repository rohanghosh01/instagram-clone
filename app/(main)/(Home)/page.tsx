"use client";
import Footer from "@/components/footer";
import Post from "@/components/home/post";
import StatusCarousel from "@/components/home/stories/status-carousel";
import SuggestionCard from "@/components/home/suggestion-card";
import PostSkeleton from "@/components/skeletons/post-skeketon";
import StatusSkeleton from "@/components/skeletons/status-bar-skeleton";
import SuggestionCardSkeleton from "@/components/skeletons/suggestion-skeketon";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUser } from "@/store/userSlice";
import { PostProps } from "@/types/postType";
import axios from "axios";
import { Loader, RefreshCcw } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { refetchPost } from "@/store/postSlice";
import { useRootContext } from "@/context/rootContext";
const queryClient = new QueryClient();

const Page = () => {
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();
  const isNewPost = useAppSelector((state) => state.post.refetch);
  const postRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useRootContext();

  const fetchPosts = async ({ pageParam = 0 }) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/post?offset=${pageParam}&limit=10`
      );
      setLoading(false);
      return response.data; // Adjust based on your response
    } catch (error: any) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  // Fetch user data
  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/user");
      const { result } = response.data;
      dispatch(setUser(result));
    } catch (error: any) {
      console.log("error get user", error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Use useInfiniteQuery for infinite scrolling
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextId, // Adjust based on your response
    getPreviousPageParam: (firstPage) => firstPage.previousId, // Adjust based on your response
    refetchOnWindowFocus: false, // Prevent refetch when the window is focused
    refetchOnReconnect: false, // Prevent refetch when reconnecting to the network
    staleTime: 5 * 60 * 1000, // Consider the data fresh for 5 minutes
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  useEffect(() => {
    if (isNewPost) {
      window.location.reload();
      dispatch(refetchPost(false)); // Reset the isNewPost state
    }
  }, [isNewPost, refetch, dispatch]);

  if (status === "pending") {
    return (
      <main className="ml-0 sm:ml-20 min-[1236px]:ml-64 p-4 overflow-auto overflow-x-hidden w-full flex z-10 sm:mt-0 mt-12">
        <div className="flex w-full justify-center items-start h-full">
          <div className="w-full flex-1 flex flex-col gap-10 justify-center items-center">
            <StatusSkeleton />
            <div className="flex">
              <div className="flex-1 mr-20 max-md:mr-0 max-md:w-auto">
                <PostSkeleton />
              </div>
              <div className="max-w-[400px] max-[1200px]:hidden z-20 mt-4 grow">
                <SuggestionCardSkeleton />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (status === "error") {
    throw new Error(error.message);
  }

  return (
    <main className="ml-0 sm:ml-20 min-[1236px]:ml-64 p-4 overflow-auto overflow-x-hidden w-full flex z-10 sm:mt-0 mt-12">
      <div className="flex w-full justify-center items-start h-full">
        {/* Left side with StatusCarousel and Post */}
        <div className="w-full flex-1 flex flex-col gap-10 max-sm:gap-1 justify-center items-center">
          <StatusCarousel />

          <div className="flex-1 max-md:w-auto" ref={postRef}>
            {data?.pages?.map((page, index) => (
              <Fragment key={index}>
                {page?.results?.map((item: PostProps) => (
                  <Post key={item.id} data={item} />
                ))}
              </Fragment>
            ))}
            <div>
              <button
                className="flex items-center justify-center w-full"
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loader className="animate-spin" />
                ) : null}
              </button>
            </div>
          </div>

          <div>
            <Footer className="w-full" />
          </div>
        </div>

        {/* Right side with suggestions */}
        <div className="max-w-[400px] max-[1200px]:hidden z-20 mt-4 grow">
          <SuggestionCard />
        </div>
      </div>
    </main>
  );
};

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
