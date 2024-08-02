import { signOut } from "@/auth";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";

export default function Home() {
  const movie = true; //TODO: update with db
  if (!movie)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-H2 font-montserrat px-4">
        Your movie list is empty
        <button className="bg-Primary text-body-regular rounded-xl hover:bg-green-600 mt-5 w-full max-w-xs h-11 text-sm font-montserrat">
          Add a new Movie
        </button>
      </div>
    );

  return (
    <div className="px-4 mb-20 lg:my-[100px] lg:mx-[120px]">
      {/* Nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-H2 font-montserrat mr-2 font-bold">My movies</h1>
          <Image
            src="/svgs/create.svg"
            alt="Create Icon"
            width={30}
            height={30}
            priority
          />
        </div>
        <form
          className="flex items-center cursor-pointer hover:text-slate-400"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex items-center">
            <p className="font-montserrat mr-2">Logout</p>
            <Image
              src="/svgs/logout.svg"
              alt="Logout Icon"
              width={20}
              height={20}
              priority
            />
          </button>
        </form>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
          // TODO: replace with db data
          return (
            <MovieCard
              movieImageProps={{
                src: "https://www.figma.com/file/rsilPqu30TpPX7IOPqLPAf/image/71b726c9bdb04893d9269540ca86da074296255e",
                alt: "movie",
              }}
              movieTitle="Movie"
              movieYear="2022"
            />
          );
        })}
      </div>
    </div>
  );
}
