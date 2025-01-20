"use client";

import { Button } from "@/components/ui/button";
import { AddToFavorite } from "@/types";
import { addToFavorite } from "./actions";

interface ButtonAddFavoriteProps {
  data: {
    id: string;
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    page: string;
  };
  isAleadyFavorite: boolean;
}

export default function ButtonAddFavorite({
  data,
  isAleadyFavorite,
}: ButtonAddFavoriteProps) {
  const handleAddFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    { id, Title, Year, Genre, Director, page }: AddToFavorite
  ) => {
    event.preventDefault();
    addToFavorite({ id, Title, Year, Genre, Director, page });
  };

  return (
    <Button
      onClick={(e) => handleAddFavorite(e, data)}
      disabled={isAleadyFavorite}
    >
      {isAleadyFavorite ? "Already in favorites" : "Add to favorites"}
    </Button>
  );
}
