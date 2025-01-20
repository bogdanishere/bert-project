"use server";

import prisma from "@/lib/prisma";
import api from "@/network/axiosInstance";
import { AddToFavorite, SearchMovieById } from "@/types";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const apiKey = process.env.NEXT_API_KEY;

export const searchMovieById = async (imdbID: string) => {
  const response: SearchMovieById = await api.get(
    `?apikey=${apiKey}&i=${imdbID}`
  );
  return response.data;
};

export const addToFavorite = async (data: AddToFavorite) => {
  const user = await auth();

  if (!user.userId) redirect("/sign-in");

  const existingFavorite = await prisma.favoriesMovies.findFirst({
    where: {
      movieId: data.id,
      UserId: user.userId,
    },
  });

  if (existingFavorite) {
    throw new Error("Movie already in favorite");
  }

  try {
    await prisma.favoriesMovies.create({
      data: {
        movieId: data.id,
        Title: data.Title,
        Year: data.Year,
        Genre: data.Genre,
        Director: data.Director,
        page: data.page,
        UserId: user.userId,
      },
    });

    revalidatePath("/profile");
    console.log("Added to favorite");
  } catch (error) {
    console.error("Error adding to favorite", error);
  }
};

export const existingMovieInFavorite = async (id: string): Promise<boolean> => {
  const user = await auth();

  if (!user.userId) return false;

  const existingFavorite = await prisma.favoriesMovies.findFirst({
    where: {
      movieId: id,
      UserId: user.userId,
    },
  });

  return !!existingFavorite;
};
