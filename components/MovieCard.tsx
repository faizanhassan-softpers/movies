import Image, { ImageProps } from "next/image";
import { FC, ReactElement } from "react";

interface MovieCardProps {
  movieImageProps?: ImageProps;
  movieTitle?: string;
  movieYear?: string;
}

const MovieCard: FC<MovieCardProps> = (props): ReactElement => {
  return (
    <div className="container bg-Card h-[504px] w-[282px] rounded-xl">
      <div className="relative h-5/6 mx-2 top-2">
        <Image
          src=""
          alt=""
          className="rounded-md"
          layout="fill"
          objectFit="cover"
          fill={true}
          {...props.movieImageProps}
        />
      </div>
      <div className="relative mx-2 mt-5">
        <p className="font-montserrat font-medium text-[20px]">
          {props.movieTitle}
        </p>
        <p className="font-montserrat font-normal text-[14px]">
          {props.movieYear}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
