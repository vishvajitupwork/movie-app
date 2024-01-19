import { Movie } from "@/api/movie";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = Movie & {};

const MovieCard = (props: Props) => {
  const { _id, posterUrl, publishYear, title } = props;
  return (
    <article className="p-3 pb-4 bg-card max-w-[300px] rounded-xl">
      <Link href={`/${_id}`}>
        {posterUrl ? (
          <Image
            className="min-h-[400px] rounded-xl mb-4 object-cover"
            src={posterUrl}
            alt={`movie-img-${title}`}
            width={300}
            height={400}
          />
        ) : null}
        <h5 className="text-xl mb-2">{title}</h5>
        <p className="text-sm">{publishYear}</p>
      </Link>
    </article>
  );
};

export default MovieCard;
