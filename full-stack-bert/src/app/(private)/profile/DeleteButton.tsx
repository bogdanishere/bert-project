"use client";

import { Button } from "@/components/ui/button";
import { deleteFavoriteMovie } from "./actions";

export default function DeleteButton({ movieId }: { movieId: string }) {
  const handleDelete = async () => {
    console.log("movieId", movieId);
    await deleteFavoriteMovie(movieId);
  };
  return (
    <Button variant="destructive" className="ml-4" onClick={handleDelete}>
      Delete from favorites
    </Button>
  );
}
