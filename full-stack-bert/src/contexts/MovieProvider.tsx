"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { searchMoviesByNameOrType } from "@/app/(public)/[page]/actions";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MovieContextType {
  page: string;
  setPage: (page: string) => void;
  movieSearch: string;
  setMovieSearch: (movieSearch: string) => void;
  movies: Movie[];
  loading: boolean;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);

interface MovieProviderProps {
  children: ReactNode;
}

export default function MovieProvider({ children }: MovieProviderProps) {
  const pathname = usePathname();

  const [page, setPage] = useState(pathname.slice(1) || "1");
  const [movieSearch, setMovieSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const values = {
    page,
    setPage,
    movieSearch,
    setMovieSearch,
    movies,
    loading,
  };

  useEffect(() => {
    (async () => {
      try {
        if (!movieSearch || !page) return;
        setLoading(true);
        const data = await searchMoviesByNameOrType(movieSearch, page);
        setMovies(data.Search || []);
        setLoading(false);
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [movieSearch, page]);

  useEffect(() => {
    setPage(pathname.slice(1) || "1");
  }, [pathname]);

  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
}
