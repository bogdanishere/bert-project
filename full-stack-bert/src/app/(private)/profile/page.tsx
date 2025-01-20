import Link from "next/link";
import { getFavoriteMovies } from "./actions";
import { currentUser } from "@clerk/nextjs/server";

import DeleteButton from "./DeleteButton";

export default async function Page() {
  const user = await currentUser();
  return (
    <section className="flex min-h-screen flex-col px-6 lg:px-24 pt-16">
      <h1 className="mb-6 text-3xl lg:text-4xl font-bold">
        Welcome back {`${user?.fullName && `, ${user.fullName}`}`}.
      </h1>
      <h2 className="mb-8 text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Here are your latest movie recommendations:
      </h2>

      <MovieFavoriteList />
    </section>
  );
}

async function MovieFavoriteList() {
  const movies = await getFavoriteMovies();

  return (
    <div className="grid gap-4 lg:gap-6 ">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="p-6 bg-white dark:bg-slate-700 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-center">
            <Link
              href={`/multimedia/${movie.movieId}/${movie.page}`}
              className="block"
            >
              <h3 className="text-lg font-bold dark:text-gray-200">
                {movie.Title}
              </h3>
              <p className="text-sm dark:text-gray-300">{movie.Genre}</p>
            </Link>

            <DeleteButton movieId={movie.id} />
          </div>

          <div className="mt-3 text-right">
            <p className="text-sm dark:text-gray-300">{movie.Year}</p>
            <p className="text-sm dark:text-gray-300">{movie.Director}</p>
          </div>
        </div>
      ))}

      {movies.length === 0 && (
        <>
          <h2 className="mb-8 text-xl lg:text-2xl font-semibold text-muted-foreground">
            No Movies Found
          </h2>
          <p className="text-lg text-muted-foreground">
            No favorite movies yet.
          </p>
          <p className="text-muted-foreground">
            You can add them going back to the main page!
          </p>
        </>
      )}
    </div>
  );
}
