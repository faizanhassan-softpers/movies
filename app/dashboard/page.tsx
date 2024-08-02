import { signOut } from "@/auth";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";
export default function Home() {
  const movie = true; //TODO: update with db
  if (!movie)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-H2 font-montserrat">
        Your movie list is empty
        <button className="bg-Primary text-body-regular rounded-xl hover:bg-green-600 mt-5 w-[146px] h-11 text-sm font-montserrat">
          Add a new Movie
        </button>
      </div>
    );
  return (
    <div>
      <div
        // Nav
        className="flex mt-10 mx-[120px] justify-between"
      >
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-H2 font-montserrat mr-2 font-bold">My movies</h1>
          <Image
            className=""
            src="/svgs/create.svg"
            alt="Next.js Logo"
            width={30}
            height={37}
            priority
          />
        </div>
        <form
          className="flex flex-row justify-center items-center cursor-pointer hover:text-slate-400"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex flex-row justify-center items-center">
            <p className="font-montserrat mr-2">Logout</p>
            <Image
              className=""
              src="/svgs/logout.svg"
              alt="logout"
              width={20}
              height={37}
              priority
            />
          </button>
        </form>
      </div>
      <div className="mx-[120px] mt-10 grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
          // TODO: replace with db data */}
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
