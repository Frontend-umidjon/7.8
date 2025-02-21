import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getMovies: build.query({
      query: (params) => ({
        url: "/discover/movie",
        method: "GET",
        params,
      }),
    }),
    getSingleMovie: build.query({
      query: (id) => ({
        url: `/movie/${id}`,
        method: "GET",
      }),
    }),
    getSingleMovieImages: build.query({
      query: (id) => ({
        url: `/movie/${id}/images`,
        method: "GET",
      }),
    }),
    getSingleMovieSimilar: build.query({
      query: (id) => ({
        url: `/movie/${id}/similar`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMoviesQuery,
  useGetSingleMovieQuery,
  useGetSingleMovieImagesQuery,
  useGetSingleMovieSimilarQuery,
} = extendedApi;
