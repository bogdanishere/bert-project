export interface SearchMovieById {
  data: {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    Error?: string;
  };
}

export interface AddToFavorite
  extends Omit<
    SearchMovieById["data"],
    | "Rated"
    | "Released"
    | "Runtime"
    | "Writer"
    | "Actors"
    | "Plot"
    | "Language"
    | "Country"
    | "Awards"
    | "Poster"
    | "Ratings"
    | "Error"
  > {
  id: string;
  page: string;
}
