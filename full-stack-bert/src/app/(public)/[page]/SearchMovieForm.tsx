"use client";

import { Button } from "@/components/ui/button";
import { searchMovieSchema, type SearchMovieType } from "@/lib/validations";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMovie } from "@/contexts/useMovie";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SearchMovieForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SearchMovieType>({
    resolver: zodResolver(searchMovieSchema),
  });

  const { movieSearch, setMovieSearch } = useMovie();

  const onSubmit: SubmitHandler<SearchMovieType> = async (data) => {
    if (data.movie !== movieSearch) router.push("/1");
    setMovieSearch(data.movie);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-20">
      <div className="flex flex-col gap-y-4">
        <input
          type="text"
          id="movie"
          placeholder="Search your next movie"
          {...register("movie", { required: true })}
          className="block w-full px-4 py-3 text-lg bg-white/15 border-b-1 border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {errors.movie && (
          <span className="text-sm text-red-600 font-semibold ">
            {errors.movie.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-[40%] px-3 py-5 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-300 rounded-full"
      >
        {isLoading ? "Searching..." : "Discover new stories"}
      </Button>
    </form>
  );
}
