"use server";

import api from "@/network/axiosInstance";

const apiKey = process.env.NEXT_API_KEY;

interface SearchMoviesByNameOrType {
  data: {
    Search: {
      Title: string;
      Year: string;
      imdbID: string;
      Type: string;
      Poster: string;
    }[];
    Error?: string;
  };
}

export const searchMoviesByNameOrType = async (
  query: string,
  page: number | string = 1
) => {
  const response: SearchMoviesByNameOrType = await api.get(
    `?apikey=${apiKey}&s=${query}&page=${page}`
  );

  return response.data || [];
};

// with fetch now, instead of axios

// export const searchMoviesByNameOrType = async (
//   query: string,
//   page: number | string = 1
// ) => {
//   console.log("api", apiKey, "query", query, "page", page);
//   const response = await fetch(
//     `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`
//   );
//   const data: SearchMoviesByNameOrType = await response.json();

//   console.log("api", apiKey);
//   console.log("data.data: ", data);

//   return data.data;
// };
