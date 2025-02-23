import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Pagination, Navigation, Autoplay, FreeMode, Thumbs } from "swiper/modules";
import { useGetMoviesQuery } from "@/redux/api/movie.api";
import { FaPlay } from "react-icons/fa";

const Hero = () => {
  const { data, isLoading } = useGetMoviesQuery();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (thumbsSwiper?.destroyed) {
      setThumbsSwiper(null);
    }
  }, [thumbsSwiper]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center text-white">
        <div className="animate-pulse w-full h-full flex items-center justify-center bg-gray-800">
          <div className="w-3/4 h-3/4 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] bg-white text-black flex items-center justify-center dark:bg-black dark:text-white">
        {data ? (
          <Swiper
            modules={[Pagination, Navigation, Autoplay, Thumbs]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="w-full h-full"
            loop={true}
          >
            {data?.results?.slice(0, 5)?.map((movie) => (
              <SwiperSlide key={movie.id} className="w-full h-full relative">
                <div
                  className="w-full h-full bg-cover bg-center brightness-75 flex items-center justify-center"
                  style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL + movie.backdrop_path})` }}
                >
                  <div className="absolute p-8 bottom-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 w-full bg-black opacity-65">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
                      {movie.title}
                    </h2>
                    <p className="line-clamp-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mb-6 drop-shadow-md">
                      {movie.overview}
                    </p>
                    <button className="flex items-center gap-2 cursor-pointer mt-4 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-sm sm:text-base md:text-lg rounded-lg shadow-lg">
                      <FaPlay /> Watch Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>No movie data</div>
        )}
      </div>
      <div className="mt-4 w-full max-w-4xl mx-auto">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full h-24"
        >
          {data?.results?.slice(0, 5)?.map((movie) => (
            <SwiperSlide key={movie.id} className="cursor-pointer border-2 border-transparent hover:border-red-600 transition-all">
              <img
                className="w-full h-full object-cover object-top rounded-md"
                src={`${import.meta.env.VITE_IMAGE_URL + movie.backdrop_path}`}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;
