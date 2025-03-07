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
  const { data, isLoading } = useGetMoviesQuery({
    page: 1,
    without_genres: "18,36,10749",
  });
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (thumbsSwiper?.destroyed) {
      setThumbsSwiper(null);
    }
  }, [thumbsSwiper]);

  if (isLoading) {
    return (
      <div className="w-full h-[700px] flex items-center justify-center text-white bg-black">
        <div className="animate-pulse w-3/4 h-3/4 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-[750px] text-white">
        {data ? (
          <Swiper
            modules={[Pagination, Navigation, Autoplay, Thumbs]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
           
            autoplay={{ delay: 500000000000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="w-[1360px] h-[700px] rounded-2xl"
            loop={true}
          >
            {data?.results?.slice(4, 15)?.map((movie) => (
              <SwiperSlide key={movie.id} className="relative w-full h-[800px]">
                <div
                  className="w-full h-[800px] bg-cover bg-center flex items-center justify-center before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:via-transparent before:to-black"
                  style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL + movie.backdrop_path})` }}
                >
                  <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-3xl text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl">
                      {movie.title}
                    </h2>
                    <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl line-clamp-3">
                      {movie.overview}
                    </p>
                    <button className=" mx-auto mt-8 flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white text-lg font-semibold rounded-full shadow-2xl transition-transform transform hover:scale-105">
                      <FaPlay className="text-xl" /> Watch Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center">No movie data</div>
        )}
      </div>
      <div className=" w-full max-w-5xl mx-auto">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full h-32"
        >
          {data?.results?.slice(4, 15)?.map((movie) => (
            <SwiperSlide key={movie.id} className="cursor-pointer border-2 border-transparent hover:border-red-600 transition-all overflow-hidden rounded-xl">
              <img
                className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-all"
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