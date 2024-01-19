import apiconfig from "@/api/apiConfig";
import { Movie, MovieResponse, getAllMovie } from "@/api/movie";
import { useMovieInfinteQuery, useMovieQuery } from "@/api/movieQuery";
import { Button } from "@/components/Button";
import MovieList from "@/components/movieList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useMediaQuery } from "usehooks-ts";

export const getServerSideProps = (async (req) => {
  const token = req.req.cookies[apiconfig.accessToken];
  let data: MovieResponse["data"] = { totalCount: 0, results: [] };
  if (token) {
    // Fetch data from external API
    const pages = new URLSearchParams({
      limit: String(apiconfig.limit),
      page: "1",
    });
    const res = await getAllMovie(token, pages.toString());
    data = res.data;
  }

  return { props: { movies: data } };
}) satisfies GetServerSideProps<{ movies: MovieResponse["data"] }>;

export default function HomePage({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isMedia = useMediaQuery("(max-width: 768px)");
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const { allMovies, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMovieInfinteQuery(
      movies?.results?.length
        ? { pageParams: [1], pages: [{ data: movies }] }
        : undefined
    );

  const { data: movieData } = useMovieQuery(
    router.query?.page ? (router.query.page as string) : 1
  );

  const onClickLogout = () => {
    Cookies.remove(apiconfig.accessToken);
    router.push("/login");
  };

  return allMovies?.length ? (
    <section className="md:p-[120px] p-7">
      <header className="flex justify-between md:mb-[120px] mb-7">
        <div className="flex items-center">
          <h2 className="md:text-5xl sm:tex-3xl text-2xl">My movies</h2>
          <button
            className="flex items-center mt-2 ml-3"
            onClick={() => router.push("/add")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clip-path="url(#clip0_3_196)">
                <path
                  d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_196">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <button
          className="flex justify-center items-center font-bold text-base"
          onClick={onClickLogout}
        >
          <span className="sm:flex hidden">Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={"16px"}
            viewBox="0 0 32 32"
            fill="none"
            className="ml-3"
          >
            <g clip-path="url(#clip0_7_232)">
              <path
                d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_232">
                <rect width="32" height="32" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </header>
      <div>
        <MovieList
          movies={isMedia ? allMovies : (movieData?.data.results as Movie[])}
          page={router.query?.page ? Number(router.query.page) : 1}
          totalCount={data?.pages[0]?.data?.totalCount}
          onChangePage={(page) => {
            router.push(`?page=${page}`);
          }}
          hasNextPage={hasNextPage}
          onChangeInview={(i) => {
            if (isMedia && i && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      </div>
    </section>
  ) : (
    <section className="flex min-h-[calc(100vh-117px)] flex-col items-center justify-center p-24">
      <h2 className="text-5xl mb-10">Your movie list is empty</h2>
      <Button onClick={() => router.push("/add")}>Add a new movie</Button>
    </section>
  );
}
