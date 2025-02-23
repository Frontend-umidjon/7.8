import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleMovieImagesQuery,
  useGetSingleMovieQuery,
  useGetSingleMovieSimilarQuery,
} from "../../redux/api/movie.api";
import Movies from "@/components/Movies";
import { FaStar, FaRegClock } from "react-icons/fa";
import { Image } from 'antd';

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleMovieQuery(id);
  const { data: images } = useGetSingleMovieImagesQuery(id);
  const { data: similarData } = useGetSingleMovieSimilarQuery(id);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-[700px] bg-gray-700 animate-pulse rounded-xl"></div>
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="w-[300px] h-[450px] bg-gray-700 animate-pulse rounded-lg"></div>
          <div className="flex-1 space-y-4">
            <div className="w-3/4 h-10 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-full h-24 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-1/2 h-6 bg-gray-700 animate-pulse rounded"></div>
            <div className="w-1/3 h-6 bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-full h-48 bg-gray-700 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[700px] rounded-xl overflow-hidden shadow-lg">
        <img
          className="w-full h-full object-cover"
          src={`${import.meta.env.VITE_IMAGE_URL}${data?.backdrop_path}`}
          alt={data?.title}
        />
       
      </div>
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <img
          className="w-[300px] rounded-lg shadow-lg"
          src={`${import.meta.env.VITE_IMAGE_URL}${data?.poster_path}`}
          alt={data?.title}
        />
        <div className="flex-1 text-white space-y-4">
          <h2 className="text-4xl text-black dark:text-white font-semibold">{data?.title}</h2>
          <p className="text-gray-400">{data?.overview}</p>
          
          <div className="flex items-center gap-4 text-lg">
            <span className="flex items-center gap-2 text-yellow-400">
              <FaStar /> {data?.vote_average?.toFixed(1)} / 10
            </span>
            <span className="flex items-center gap-2 text-gray-300">
              <FaRegClock /> {data?.runtime} min
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {data?.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.backdrops?.slice(0, 8)?.map((image) => (
          <Image key={image.file_path}
          src={`${import.meta.env.VITE_IMAGE_URL}${image.file_path}`}
          className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Similar Movies</h2>
        <Movies data={similarData} />
      </div>
    </div>
  );
};

export default Detail;
