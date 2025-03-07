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
    getGenres: build.query({
      query: () => ({
        url: `/genre/movie/list`,
        method: "GET",
      }),
    }),
    getSearch: build.query({
      query: (params) => ({
        url: `/search/movie`,
        method: "GET",
        params,
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
  useGetGenresQuery,
  useGetSearchQuery
} = extendedApi;
