import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { idMovieAtom, isFetchingAtom, searchMovieAtom } from "@/jotai/atoms";

import EachUtils from "@/utils/EachUtils";
import { getSearchMovies } from "@/utils/getSearchMovies";
import MovieCard from "@mods/Common/MovieCard";

const SearchMovies = () => {
  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  const [, setIdMovie] = useAtom(idMovieAtom);
  const [SearchQuery] = useAtom(searchMovieAtom);

  useEffect(() => {
    if (SearchQuery) {
      getSearchMovies({ query: SearchQuery })
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
  }, [SearchQuery]);

  return (
    <div className="w-full p-4 pt-40">
      <h1 className="mb-4 text-2xl ml-14">
        Hasil Pencarian:{" "}
        <span className="font-semibold text-white"> {SearchQuery}</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="overflow-hidden rounded-md h-80"
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
      </div>
    </div>
  );
};
export default SearchMovies;
