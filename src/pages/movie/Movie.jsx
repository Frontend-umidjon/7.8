import Movies from "@/components/Movies";
import { useGetMoviesQuery } from "@/redux/api/movie.api";
import React from "react";

const Movie = () => {
  const { data,isLoading}= useGetMoviesQuery()
  return <div>
    <Movies  data={data}/>
  </div>;
};

export default Movie;
