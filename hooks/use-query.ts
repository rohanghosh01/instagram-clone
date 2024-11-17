import { useInfiniteQuery } from "@tanstack/react-query";
import { NextPage } from "next";

export const UseFetchQuery = ({ fetchData }: any): any => {
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
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => lastPage.nextId, // Adjust based on your response
    getPreviousPageParam: (firstPage: any) => firstPage.previousId, // Adjust based on your response
    refetchOnWindowFocus: false, // Prevent refetch when the window is focused
    refetchOnReconnect: false, // Prevent refetch when reconnecting to the network
    staleTime: 5 * 60 * 1000, // Consider the data fresh for 5 minutes
  });

  return {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  };
};
