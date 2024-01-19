"use client";
import apiconfig from "@/api/apiConfig";
import { Movie, MovieResponse } from "@/api/movie";
import { useMovieInfinteQuery } from "@/api/movieQuery";
import { MovieCard } from "@/components/MovieCard";
import { Pagination } from "@/components/Pagination";
import React, { useId, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import InfiniteLoadingIcon from "./LoadingIcon";
import { useInView } from "react-intersection-observer";

type Props = {
  movies: Movie[];
  totalCount?: number;
  page: number;
  onChangePage: (page?: number) => void;
  hasNextPage?: boolean;
  onChangeInview: (i: boolean) => void;
};

const MovieList = (props: Props) => {
  const {
    movies,
    totalCount,
    onChangePage,
    page,
    hasNextPage,
    onChangeInview,
  } = props;
  const id = useId();

  const isMedia = useMediaQuery("(min-width: 768px)");

  const { ref } = useInView({
    onChange: onChangeInview,
  });

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {movies?.map((e, i) => {
          const key = `${i}-${id}`;
          return (
            <div
              className="col-span-6 sm:col-span-4 md:col-span-3"
              key={e?._id}
            >
              <MovieCard {...e} />
            </div>
          );
        })}
      </div>
      {isMedia && totalCount ? (
        <div className="mt-7">
          <Pagination
            count={Math.ceil(totalCount / apiconfig.limit)}
            currentPage={page}
            onClickPage={onChangePage}
          />
        </div>
      ) : null}
      {!isMedia && hasNextPage ? (
        <div
          ref={ref}
          className="col-span-12 flex w-full items-center justify-center py-3 md:hidden"
        >
          <InfiniteLoadingIcon />
        </div>
      ) : null}
    </>
  );
};

export default MovieList;
