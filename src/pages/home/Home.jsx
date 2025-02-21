import React from "react";
import { useGetMoviesQuery } from "../../redux/api/movie.api";
import Movies from "@/components/Movies";
import Hero from "@/components/Hero";

const Home = () => {
  const { data, isLoading } = useGetMoviesQuery({
    page: 3,
    without_genres: "18,36,10749",
  });

  return (
    <>
      <Hero/> 
     
      <Movies data={data} />
    </>
  );
};

export default Home;
