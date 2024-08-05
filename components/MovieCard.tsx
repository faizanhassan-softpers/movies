import Image, { ImageProps } from "next/image";
import { FC, ReactElement } from "react";

interface MovieCardProps {
  movieImageProps?: ImageProps;
  movieTitle?: string;
  movieYear?: string;
}

const MovieCard: FC<MovieCardProps> = (props): ReactElement => {
  return (
    <div className="bg-Card h-auto w-full rounded-xl">
      <div className="relative h-96 mx-2 mt-2">
        <Image
          // src="https://www.figma.com/file/rsilPqu30TpPX7IOPqLPAf/image/71b726c9bdb04893d9269540ca86da074296255e"
          // src={props.movieImageProps.src}
          src={props.movieImageProps.src}
          alt={props.movieImageProps.alt}
          className="rounded-md"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mx-2 my-5 ">
        <p className="font-montserrat font-medium text-lg">
          {props.movieTitle}
        </p>
        <p className="font-montserrat font-normal text-sm">{props.movieYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
