import React, { useEffect } from "react";
import {
  useGetSingleMovieImagesQuery,
  useGetSingleMovieQuery,
  useGetSingleMovieSimilarQuery,
} from "../../redux/api/movie.api";
import { useParams } from "react-router-dom";
import Movies from "@/components/Movies";

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleMovieQuery(id);
  const { data: images } = useGetSingleMovieImagesQuery(id);
  const { data: similarData } = useGetSingleMovieSimilarQuery(id);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="h-[700px] bg-gray-400">
        <img
          className="w-full h-full object-cover "
          src={import.meta.env.VITE_IMAGE_URL + data?.backdrop_path}
          alt=""
        />
      </div>

      <div>
        <h1 className="text-3xl">{data?.title}</h1>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-20">
        {images?.backdrops?.slice(0, 8)?.map((image) => (
          <img
            key={image.file_path}
            className="w-[300px]"
            src={import.meta.env.VITE_IMAGE_URL + image.file_path}
            alt=""
          />
        ))}
      </div>

      <div>
        <Movies data={similarData} />
      </div>
    </div>
  );
};

export default Detail;
