import PaginationToggle from "@/components/PaginationToggle";
import SearchMovieForm from "./SearchMovieForm";
import MovieList from "./MovieList";
import Footer from "./Footer";

interface PageProps {
  params: Promise<{
    page: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const { page } = await params;

  return (
    <header className="relative h-screen w-full dark:bg-[#333333] dark:text-white">
      <section className="relative h-screen">
        <div
          className="w-full h-screen 
                    bg-gradient-to-br from-[rgba(56,189,248,0.85)] to-[rgba(7,89,133,0.85)] 
                    dark:bg-gradient-to-br dark:from-[rgba(56,189,248,0.5)] dark:to-[rgba(7,89,133,0.5)] 
                    bg-cover bg-top relative transition-all duration-300 ease-in-out clip-custom"
        >
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1>
              <span className="block text-8xl font-normal tracking-[1.5rem] animate-[moveInLeft_1.5s_ease-out_forwards]">
                FlickFinder
              </span>
              <span className="pt-2 block text-[2rem] font-bold tracking-[1rem] animate-[moveInRight_1.5s_ease-out_forwards]">
                Uncover new stories
              </span>
            </h1>
            <SearchMovieForm />
          </div>
        </div>
      </section>

      <div className=" w-full h-32 dark:bg-[#333333]" />

      <section className="dark:bg-[#333333] pb-20">
        <MovieList />
        <PaginationToggle currentPage={+page} totalPages={20} />
      </section>

      <Footer />
    </header>
  );
}
