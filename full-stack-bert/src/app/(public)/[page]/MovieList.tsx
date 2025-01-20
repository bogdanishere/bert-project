"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useMovie } from "@/contexts/useMovie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MovieList() {
  const { movies, loading, page } = useMovie();

  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s";

  const [failedImages, setFailedImages] = useState<string[]>([]);

  const handleImageError = (imdbID: string) => {
    setFailedImages((prev) => [...prev, imdbID]);
  };

  const filteredMovies = movies.filter(
    (movie) => !failedImages.includes(movie.imdbID) && movie.Poster !== "N/A"
  ); // IN REACT 19 WE CAN STOP USING USEMEMO FOR THIS

  return (
    <div>
      {loading && <Spinner />}
      {movies.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 p-8 transition-all duration-300">
          {filteredMovies.map((movie) => (
            <div key={movie.imdbID} className="card">
              <div className="card__side card__side--front">
                <Image
                  className="w-[95%] h-[95%] object-cover object-center"
                  width={200}
                  height={300}
                  src={movie.Poster === "N/A" ? fallbackImage : movie.Poster}
                  alt={`Poster for ${movie.Title}`}
                  onError={() => handleImageError(movie.imdbID)}
                />
              </div>

              <div className="card__side card__side--back bg-primary/50 text-primary-foreground hover:bg-primary/40">
                <div
                  className="text-white flex flex-col items-center
                 justify-center gap-4 p-1"
                >
                  <h2 className="mb-8 text-2xl px-9 flex justify-center items-center mx-auto">
                    {movie.Title}
                  </h2>
                  <p>Year: {movie.Year}</p>
                  <p className="mb-2">Category: {movie.Type}</p>
                  <Link href={`/multimedia/${movie.imdbID}/${page}`}>
                    <Button>More Info</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && (
        <div className="text-center ">
          <p className="pb-20  heading-secondary">
            The movies you&apos;re looking for on this page could not be found.
            Please try a different search.
          </p>
        </div>
      )}
    </div>
  );
}
