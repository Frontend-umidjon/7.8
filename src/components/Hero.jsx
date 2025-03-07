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
      <div className="w-full h-[700px] flex items-center justify-center text-white bg-black">
        <div className="animate-pulse w-3/4 h-3/4 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-[700px] text-white">
        {data ? (
          <Swiper
            modules={[Pagination, Navigation, Autoplay, Thumbs]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="w-full h-full"
            loop={true}
          >
            {data?.results?.slice(0, 5)?.map((movie) => (
              <SwiperSlide key={movie.id} className="relative w-full h-full">
                <div
                  className="w-full h-full bg-cover bg-center flex items-center justify-center before:absolute before:inset-0 before:bg-black/50"
                  style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL + movie.backdrop_path})` }}
                >
                  <div className="relative z-10 p-8 max-w-2xl text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                      {movie.title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl line-clamp-3">
                      {movie.overview}
                    </p>
                    <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105">
                      <FaPlay /> Watch Now
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
      <div className="mt-6 w-full max-w-4xl mx-auto">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full h-28"
        >
          {data?.results?.slice(0, 5)?.map((movie) => (
            <SwiperSlide key={movie.id} className="cursor-pointer border-2 border-transparent hover:border-red-600 transition-all overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-md transform hover:scale-105 transition-all"
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
