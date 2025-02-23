import React from "react";
import { useGetMoviesQuery } from "../../redux/api/movie.api";
import Movies from "@/components/Movies";
import Hero from "@/components/Hero";

const Home = () => {
  const { data, isLoading } = useGetMoviesQuery({
    page: 1,
    without_genres: "18,36,10749",
  });

  return (
    <>
     <Hero/> 
     <main className="container">
    
      <h2 className="text-3xl my-8">Recomended movies</h2>
      <Movies data={data} />
     </main>
    </>
  );
};

export default Home;
