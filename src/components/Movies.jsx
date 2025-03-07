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
    <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 mt-10 px-4">
      {data?.results?.map((movie) => (
        <div
          className="border border-gray-300 dark:border-gray-800 dark:bg-gray-700 rounded-lg overflow-hidden relative shadow-md"
          key={movie.id}
        >
          <button
            className="absolute top-3 right-3 text-white text-lg sm:text-xl cursor-pointer"
            onClick={() => handleToggleSave(movie)}
          >
            {saved?.some((item) => item.id === movie.id) ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          
          <Link
            to={`/movie/${movie.id}`}
            className="block w-full h-60 sm:h-72 md:h-64 lg:h-72 bg-gray-400"
          >
            <img
              className="w-full h-full object-cover object-top rounded-t-lg"
              src={import.meta.env.VITE_IMAGE_URL + movie.poster_path}
              alt={movie.title}
            />
          </Link>
          
          <div className="p-3">
            <h3 className="text-md sm:text-lg font-medium truncate" title={movie.title}>
              {movie.title}
            </h3>
            <p className="text-yellow-500 font-medium flex items-center gap-1.5 text-sm sm:text-base">
              <FaRegStar /> {movie.vote_average.toFixed(1)}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5">
              <IoCalendarOutline /> {movie.release_date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
