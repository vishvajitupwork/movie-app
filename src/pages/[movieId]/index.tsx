import apiconfig from "@/api/apiConfig";
import { AMovieReponse, Movie, MovieResponse, getMovie } from "@/api/movie";
import MovieForm from "@/components/movieForm";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const getServerSideProps = (async (req) => {
  const token = req.req.cookies[apiconfig.accessToken];
  const id = req?.params?.movieId;
  let data = {};
  if (token && id) {
    // Fetch data from external API
    const res = await getMovie(token, id as string);
    data = res.data;
  }

  return { props: { movie: data } };
}) satisfies GetServerSideProps<{ movie: Movie | {} }>;

const EditPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { movie } = props;
  const router = useRouter();
  const { movieId } = router.query;
  const accessToken = Cookies.get(apiconfig.accessToken);
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken]);
  return (
    <section className="md:p-[60px] sm:p-[20px] p-[14px] lg:p-[120px] min-h-[calc(100vh-117px)]">
      <h2 className="text-5xl mb-[120px] font-semibold">Edit</h2>{" "}
      <MovieForm type="EDIT" defaultValues={movie as Movie} />
    </section>
  );
};

export default EditPage;
