"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getFavoriteMovies = async () => {
  const user = await auth();

  if (!user.userId) return redirect("/sign-in");

  const res = await prisma.favoriesMovies.findMany({
    where: {
      UserId: user.userId,
    },
  });

  return res || [];
};

export const deleteFavoriteMovie = async (movieId: string) => {
  const user = await auth();

  if (!user.userId) return redirect("/sign-in");

  console.log("movieId", movieId);
  console.log("user", user.userId);

  await prisma.favoriesMovies.deleteMany({
    where: {
      UserId: user.userId,
      id: movieId,
    },
  });

  console.log("Movie deleted");

  revalidatePath("/profile");

  return;
};
