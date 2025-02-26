import Movies from "@/components/Movies";
import { useGetGenresQuery, useGetMoviesQuery } from "@/redux/api/movie.api";
import { Empty, Pagination, Spin, Skeleton } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

const Movie = () => {
  const [params, setParams] = useSearchParams();
  const page = parseInt(params.get("page")) || 1;
  const with_genres = params.get("genres") || "";

  const { data, isLoading } = useGetMoviesQuery({
    page,
    without_genres: "18,36,10749",
    with_genres,
  });

  const { data: genreData, isLoading: isLoadingGenres } = useGetGenresQuery();

  const handleChangePage = (p) => {
    if (p === 1) {
      params.delete("page");
    } else {
      params.set("page", p.toString());
    }
    setParams(params);
  };

  const handleChangeGenre = (id) => {
    let genresArray = with_genres ? with_genres.split("-") : [];
    const genreId = id.toString();

    if (genresArray.includes(genreId)) {
      genresArray = genresArray.filter((g) => g !== genreId);
    } else {
      genresArray.push(genreId);
    }

    if (genresArray.length > 0) {
      params.set("genres", genresArray.join("-"));
    } else {
      params.delete("genres");
    }

    setParams(params);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-3 overflow-auto py-3 genre-scroll">
        {isLoadingGenres
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton.Button key={index} active className="px-4 py-2 rounded-full" />
            ))
          : genreData?.genres?.map((genre) => {
              const isActive = with_genres.split("-").includes(genre.id.toString());
              return (
                <div
                  key={genre.id}
                  onClick={() => handleChangeGenre(genre.id)}
                  className={`px-4 py-2 rounded-full border whitespace-nowrap cursor-pointer select-none transition ${
                    isActive
                      ? "bg-red-600 text-white border-red-600 "
                      : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {isActive ? (
                    <div className="flex items-center gap-2">
                      {genre.name} <MdOutlineClose />
                    </div>
                  ) : (
                    genre.name
                  )}
                </div>
              );
            })}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 dark:border-gray-800 dark:bg-gray-700 rounded-lg overflow-hidden"
            >
              <Skeleton.Image className="w-full h-[300px] sm:h-[350px] md:h-[400px]" active />
              <div className="p-2">
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        data?.total_results ? (
          <Movies data={data} />
        ) : (
          <div className="col-span-full flex justify-center items-center mt-10">
            <Empty description="No movies available"  />
          </div>
        )
      )}

      {!!data?.total_results && (
        <div className="flex justify-center py-6">
          <Pagination
            current={page}
            total={Math.min(data?.total_pages || 1, 500) * 10}
            showSizeChanger={false}
            size="large"
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
