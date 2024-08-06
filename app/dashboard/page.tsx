'use client';

import MovieCard from "@/components/MovieCard";
import { logout } from "@/lib";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { getLoggedInUserId } from "@/utils/functions";
import { useEffect, useState } from "react";

export default function Home() {
  const [userMovies, setUserMovies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State for loading

  const handlePageNumberClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const pageNumber = Number(event?.target.innerHTML);
    if (pageNumber != currentPage) setCurrentPage(pageNumber);
  }

  const handlePrevClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const loggedInUserId = await getLoggedInUserId();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?ownerId=${loggedInUserId}&limit=8&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();

        setUserMovies(data?.movies ?? []);
        setPagination(data?.pagination ?? {});
      } catch (error) {
        console.log('Error fetching the data:', error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchUserMovies();
  }, [currentPage]);

  const paginationLinks = [];

  for (let i = 1; i <= pagination.totalPages; i++) {
    // Define the class names
    let classes = 'relative rounded inline-flex items-center px-3 py-1 text-sm font-semibold text-white';
    if (i === pagination.page) classes += ' bg-green-500';

    // Add the link element to the array with dynamic classes and content
    paginationLinks.push(<a key={i} href="#" className={classes} onClick={handlePageNumberClick}>{i}</a>);
  }


  // Render a loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no movies found or condition for empty state
  if (userMovies.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-H2 font-montserrat px-4">
        Your movie list is empty
        <Link
          href="/dashboard/create"
          className="bg-Primary text-body-regular rounded-xl hover:bg-green-600 mt-5 w-full max-w-xs h-11 text-sm font-montserrat text-center flex items-center justify-center"
          passHref
        >
          Add a new Movie
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 mb-20 lg:my-[100px] lg:mx-[120px]">
      {/* Nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-H2 font-montserrat mr-2 font-bold">My movies</h1>
          <Link href="/dashboard/create" passHref>
            <Image
              src="/svgs/create.svg"
              alt="Create Icon"
              width={30}
              height={30}
              priority
            />
          </Link>
        </div>
        <form
          className="flex items-center cursor-pointer hover:text-slate-400"
          action={async () => {
            await logout();
            redirect("/login");
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
        {userMovies.map((movie) => (
          <Link href={`/dashboard/edit/${movie._id}`} passHref key={movie._id}>
            <MovieCard
              movieImageProps={{
                src: movie.imageUrl || "https://via.placeholder.com/150",
                alt: movie.title || "movie",
              }}
              movieTitle={movie.title || "Movie"}
              movieYear={movie.publishingYear || "2022"}
            />
          </Link>
        ))}
      </div>

      {/* Pagination links */}
      <div className="flex items-center justify-center p-5">
        <div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href="#" className="relative rounded inline-flex items-center px-3 py-1 text-sm font-semibold text-white" onClick={handlePrevClick}>Prev</a>

            {paginationLinks}

            <a href="#" className="relative rounded inline-flex items-center px-3 py-1 text-sm font-semibold text-white" onClick={handleNextClick}>Next</a>
          </nav>
        </div>
      </div>

    </div>
  );
}