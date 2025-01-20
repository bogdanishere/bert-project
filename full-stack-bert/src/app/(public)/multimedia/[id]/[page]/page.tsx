import Image from "next/image";
import { existingMovieInFavorite, searchMovieById } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ButtonAddFavorite from "./ButtonAddFavorite";

interface PageProps {
  params: Promise<{
    id: string;
    page: string;
  }>;
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  return {
    title: `Movie ${id}`,
    description: `Details for movie ID ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, page } = await params;
  const data = await searchMovieById(id);

  const isAleadyFavorite = await existingMovieInFavorite(id);

  const buttonData = {
    id,
    Title: data.Title,
    Year: data.Year,
    Genre: data.Genre,
    Director: data.Director,
    page,
  };

  return (
    <div className="min-h-screen w-full  p-8 dark:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-[300px_1fr] gap-12 pt-20">
        <div className="relative">
          <Image
            src={data.Poster}
            alt={data.Title}
            width={300}
            height={450}
            className="rounded-lg object-cover w-full"
            priority
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-5xl font-bold mb-2">{data.Title}</h1>
            <div className="text-2xl text-gray-400 mb-4">{data.Year}</div>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="px-3 py-1 dark:bg-gray-800 bg-black text-white rounded">
              {data.Runtime}
            </span>
            <span className="px-3 py-1 dark:bg-gray-800 bg-black text-white  rounded">
              {data.Genre}
            </span>
          </div>

          <p className="text-lg leading-relaxed ">{data.Plot}</p>

          <div className="space-y-3 ">
            <p>
              <span className="font-semibold ">Director:</span> {data.Director}
            </p>
            <p>
              <span className="font-semibold ">Writer:</span> {data.Writer}
            </p>
            <p>
              <span className="font-semibold ">Actors:</span> {data.Actors}
            </p>
          </div>

          <div className="flex gap-4 mt-6 justify-around">
            <Link href={`/${page}`}>
              <Button>Back to home</Button>
            </Link>
            <ButtonAddFavorite
              data={buttonData}
              isAleadyFavorite={isAleadyFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
