import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useGetMoviesQuery } from "@/redux/api/movie.api";

const Hero = () => {
  const { data, isLoading } = useGetMoviesQuery();

  if (isLoading) {
    return <div className="w-full h-[500px] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="w-full h-[500px] bg-white text-black flex items-center justify-center dark:bg-black dark:text-white">
      {data? (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {data?.results?.slice(0,5)?.map((movie) => (
            <SwiperSlide key={movie.id} className="w-[1360px] grid place-items-center h-[800px]">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                className="w-[1360px] h-[640px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No movie data available</div>
      )}
    </div>
  );
};

export default Hero;
