import React from "react";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegStar, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSave } from "@/redux/features/save.slice";

const Movies = ({ data, isLoading }) => {
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.saved.value);

  const handleToggleSave = (movie) => {
    dispatch(toggleSave(movie));
  };

  return (
    <div className="container grid max-[450px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-[80px]">
      {data?.results?.map((movie) => (
        <div
          className="border border-gray-300 dark:border-gray-800 dark:bg-gray-700 rounded-lg overflow-hidden relative"
          key={movie.id}
        >
          {saved?.some((item) => item.id === movie.id) ? (
            <FaBookmark
              className="text-white absolute top-4 right-4 cursor-pointer"
              onClick={() => handleToggleSave(movie)}
            />
          ) : (
            <FaRegBookmark
              className="text-white absolute top-4 right-4 cursor-pointer"
              onClick={() => handleToggleSave(movie)}
            />
          )}
          <Link
            to={`/movie/${movie.id}`}
            className="h-[300px] sm:h-[350px] md:h-[400px] block bg-gray-400"
          >
            <img
              className="w-full h-full object-cover"
              src={import.meta.env.VITE_IMAGE_URL + movie.poster_path}
              alt={movie.title}
            />
          </Link>
          <div className="p-2">
            <h3
              title={movie.title}
              className="text-lg sm:text-xl font-medium line-clamp-1"
            >
              {movie.title}
            </h3>
            <p className="text-yellow-500 font-medium flex items-center gap-1.5">
              <FaRegStar /> {movie.vote_average.toFixed(1)}
            </p>
            <p className="text-gray-300 text-sm flex items-center gap-1.5">
              <IoCalendarOutline /> {movie.release_date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;