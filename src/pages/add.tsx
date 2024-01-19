import MovieForm from "@/components/movieForm";
import React from "react";

type Props = {};

const AddPage = (props: Props) => {
  return (
    <section className="md:p-[60px] sm:p-[20px] p-[14px] lg:p-[120px] min-h-[calc(100vh-117px)]">
      <h2 className="text-5xl mb-[120px] font-semibold">Create a new movie</h2>{" "}
      <MovieForm type="ADD" />
    </section>
  );
};

export default AddPage;
