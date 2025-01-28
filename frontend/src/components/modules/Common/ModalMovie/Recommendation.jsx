import { LIST_VIDEO_RECOMMENDATION } from "@/constants/dummyVideo";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  emailStorage,
  idMovieAtom,
  isFavoriteAtom,
  tokenStorage,
} from "@/jotai/atoms";

import EachUtils from "@/utils/EachUtils";
import Card from "@mods/Common/ModalMovie/Card";
import { getMoviesRecommendation } from "@/utils/getMoviesRecommendation";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";

const Recommendation = () => {
  const [idMovie] = useAtom(idMovieAtom);
  const [movies, setMovies] = useState([]);

  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);

  useEffect(() => {
    if (idMovie) {
      getMoviesRecommendation({ movie_id: idMovie }).then((result) =>
        setMovies(result)
      );
    }
  }, [idMovie]);

  return (
    <div className="px-8 pb-16">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Lainnya Seperti Ini
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <EachUtils
          of={movies}
          render={(item, index) => <Card key={index} data={item} />}
        />
      </div>
    </div>
  );
};
export default Recommendation;
