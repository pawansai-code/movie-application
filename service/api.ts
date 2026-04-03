export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchPopularMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;
  // &with_original_language=ta

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to Fetch Movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchPopularTeluguMovies = async ({
  query,
}: {
  query: string;
}) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;
  // &with_original_language=te

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to Fetch Movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (
  movieID: string,
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieID}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      },
    );

    if (!response.ok) throw new Error("Failed to fetch movie details");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const url = "https://api.themoviedb.org/3/trending/movie/day";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2U2NmJkYzZjZmVhYzMzZTQ4ZGZjOTE1ODA4NWU1NiIsIm5iZiI6MTc3Mzk4NjA1Ni4wOTUsInN1YiI6IjY5YmNlMTA4ZTc2OThhOTYwZDA2ZTZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZSkJA7hXomosJXsyowUnyo0O_2TyRPFBhylBheLCqI0",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));