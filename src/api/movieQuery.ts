import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { MovieResponse, getAllMovie } from "./movie";
import apiconfig from "./apiConfig";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

export const useMovieInfinteQuery = (initialData?: any) => {
  const isMedia = useMediaQuery("(max-width: 768px)");
  const queryResult = useInfiniteQuery({
    queryKey: ["Movie"],
    queryFn: async ({ queryKey, pageParam = 1 }) => {
      const accessToken = Cookies.get(apiconfig.accessToken);
      console.info("first");

      return getAllMovie(
        accessToken as string,
        new URLSearchParams({
          page: String(pageParam),
          limit: String(apiconfig.limit),
        }).toString()
      );
    },
    enabled: isMedia,
    initialPageParam: 1,
    getNextPageParam: (last, all, lastPageParam) => {
      const newAll = all
        .map((e) => {
          return e?.data?.results;
        })
        .flat();

      return (last as MovieResponse)?.data.totalCount > newAll?.length
        ? lastPageParam + 1
        : undefined;
    },
    refetchInterval: false,
    initialData,
  });
  const allMovies = useMemo(() => {
    return queryResult.data?.pages?.length
      ? queryResult.data?.pages
          .map((e) => (e as MovieResponse)?.data?.results)
          .flat()
      : [];
  }, [queryResult.data]);

  return {
    ...queryResult,
    allMovies,
  };
};

export const useMovieQuery = (page: string | number) => {
  const isMedia = useMediaQuery("(min-width: 768px)");
  return useQuery({
    queryKey: ["Movies", page],
    queryFn: () => {
      const accessToken = Cookies.get(apiconfig.accessToken);

      return getAllMovie(
        accessToken as string,
        new URLSearchParams({
          page: String(page),
          limit: String(apiconfig.limit),
        }).toString()
      );
    },
    enabled: isMedia,
  });
};
