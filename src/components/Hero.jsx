

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/free-mode"
import "swiper/css/thumbs"
import { Pagination, Navigation, Autoplay, FreeMode, Thumbs } from "swiper/modules"
import { useGetMoviesQuery } from "@/redux/api/movie.api"
import { Play } from "lucide-react"

const Hero = () => {
  const { data, isLoading } = useGetMoviesQuery({
    page: 1,
    without_genres: "18,36,10749",
  })
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  useEffect(() => {
    if (thumbsSwiper?.destroyed) {
      setThumbsSwiper(null)
    }
  }, [thumbsSwiper])

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-white bg-black">
        <div className="animate-pulse w-11/12 sm:w-4/5 md:w-3/4 h-3/4 bg-gray-700 rounded-lg"></div>
      </div>
    )
  }

  return (
    <section className="relative w-full">
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] text-white">
        {data ? (
          <Swiper
            modules={[Pagination, Navigation, Autoplay, Thumbs]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="w-full h-full "
            loop={true}
          >
            {data?.results?.slice(4, 15)?.map((movie) => (
              <SwiperSlide key={movie.id} className="relative w-full h-full">
                <div
                  className="w-full h-full bg-cover bg-center flex items-center justify-center before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/90 before:via-black/30 before:to-black/70"
                  style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL + movie.backdrop_path})` }}
                >
                  <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-white drop-shadow-xl line-clamp-2">
                      {movie.title}
                    </h2>
                    <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 line-clamp-2 sm:line-clamp-3">
                      {movie.overview}
                    </p>
                    <button className="mx-auto mt-3 sm:mt-4 md:mt-5 lg:mt-6 flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold rounded-full shadow-xl transition-transform transform hover:scale-105">
                      <Play className="size-3 sm:size-4 md:size-5" />
                      <span>Watch Now</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <p>No movie data available</p>
          </div>
        )}
      </div>

      {/* Thumbnails Slider */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-2 sm:px-4 md:px-6 -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 relative z-20">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={4}
          slidesPerView={3}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 6 },
            640: { slidesPerView: 4, spaceBetween: 8 },
            768: { slidesPerView: 5, spaceBetween: 8 },
            1024: { slidesPerView: 6, spaceBetween: 10 },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full h-16 sm:h-20 md:h-24 lg:h-28"
        >
          {data?.results?.slice(4, 15)?.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="cursor-pointer border-2 border-transparent hover:border-red-600 transition-all overflow-hidden rounded-md sm:rounded-lg"
            >
              <img
                className="w-full h-full object-cover transform hover:scale-110 transition-all duration-300"
                src={`${import.meta.env.VITE_IMAGE_URL + movie.backdrop_path}`}
                alt={movie.title}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Hero

