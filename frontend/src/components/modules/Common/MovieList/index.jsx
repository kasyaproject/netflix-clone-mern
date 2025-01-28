import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { idMovieAtom, isFetchingAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/utils/getMoviesByType";

import EachUtils from "@/utils/EachUtils";
import CaroueselLayouts from "@/components/Layouts/CaroueselLayouts";
import MovieCard from "@mods/Common/MovieCard";

const MovieList = ({ title, moviesType }) => {
  const [isHover, setIsHover] = useState(false);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [movieList, setMovieList] = useState([]);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  useEffect(() => {
    if (moviesType) {
      getMoviesByType({ moviesType })
        .then((result) => {
          setIsFetching(true);
          setMovieList(result);
        })
        .finally(() => {
          setTimeout(() => {
            setIsFetching(false);
          }, 1000);
        });
    }
  }, [moviesType]);

  return (
    <section className="w-full px-8 mb-8 h-[340px] bg-slate-950">
      <h3 className="pl-4 mb-4 text-xl font-semibold text-white sm:text-3xl sm:pl-20">
        {title}
      </h3>

      <CaroueselLayouts>
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="w-1/3 md:w-1/4 lg:w-1/5 overflow-hidden rounded-md carousel-item"
              key={index}
              onMouseLeave={() => {
                setIsHover(false);
                setIdMovie(null);
              }}
            >
              <MovieCard
                data={item}
                isHover={isHover}
                setIsHover={setIsHover}
              />
            </div>
          )}
        />
      </CaroueselLayouts>
    </section>
  );
};
export default MovieList;
