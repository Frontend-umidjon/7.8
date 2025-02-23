import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjRjMmNmOGM2Y2QzY2FlNWY5YjdjMmQ1YjgzYWUyMyIsIm5iZiI6MTczOTk1OTYwMS43MTYsInN1YiI6IjY3YjVhZDMxMjE1MjYzOGY1ZWUzYzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YQvViCiz-ixlpB1xRZpBKcAT0UubUYqN4PD8nn_5Sr4";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      dispatch(logout());
    }
  }
  return result;
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["BLOG", "PRODUCT"],
});
