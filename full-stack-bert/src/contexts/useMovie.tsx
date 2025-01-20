"use client";
import { useContext } from "react";
import { MovieContext } from "./MovieProvider";

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};
