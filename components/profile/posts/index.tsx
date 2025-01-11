import { NextPage } from "next";
import { Card } from "../../ui/card";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRootContext } from "@/context/rootContext";
import axios from "axios";
import { UseFetchQuery } from "@/hooks/use-query";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "../../ErrorBoundary";
import { PostProps } from "@/types/postType";
import Post from "./post";
import { useParams } from "next/navigation";
const queryClient = new QueryClient();
import * as API from "../../../services/api";

interface Props {}

const Page: NextPage<Props> = () => {
  const { setLoading } = useRootContext();
  const { ref, inView } = useInView();
  const postRef = useRef<HTMLDivElement>(null);
  const { username } = useParams();
  const fetchPosts = async ({ pageParam = 0 }) => {
    try {
      setLoading(true);
      const response = await API.feedList({ limit: 10, offset: pageParam });
      setLoading(false);
      return response; // Adjust based on your response
    } catch (error: any) {
      setLoading(false);
      return;
      // throw new Error(error.message);
    }
  };
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
  } = UseFetchQuery({ fetchData: fetchPosts });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  console.log(">>", data?.pages);

  if (status === "pending") {
    return (
      <div className="flex justify-center items-start h-full">
        <button
          className="flex items-center justify-center w-full"
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          <Loader className="animate-spin" />
        </button>
      </div>
    );
  }
  if (status === "error") {
    throw new Error(error.message);
  }
  return (
    <div className="overflow-auto overflow-x-hidden flex flex-col gap-3 justify-center items-center">
      <div className="grid grid-cols-3 gap-1 max-w-4xl ">
        {data?.pages?.map((page: any, index: number) => (
          <Fragment key={index}>
            {page?.results.length ? (
              page?.results?.map((item: PostProps, i: number) => (
                <Card key={i} className="aspect-square rounded-none">
                  <Post item={item} />
                </Card>
              ))
            ) : (
              <>
                {!data?.pages?.length ||
                  (!data?.pages?.length?.[0] && (
                    <div className="text-center text-muted-foreground">No posts yet</div>
                  ))}
              </>
            )}
          </Fragment>
        ))}
      </div>
      <div>
        <button
          className="flex items-center justify-center  w-full h-5 overflow-hidden"
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? <Loader className="animate-spin" /> : null}
        </button>
      </div>
    </div>
  );
};

export default function ProfilePost() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
