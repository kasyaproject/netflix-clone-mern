import BrowseLayouts from "@/components/Layouts/BrowseLayouts";
import ModalMovie from "@/components/modules/Common/ModalMovie";
import MovieCard from "@/components/modules/Common/MovieCard";
import ToastNotif from "@/components/modules/Common/ToastNotif";
import {
  emailStorage,
  idMovieAtom,
  isFavoriteAtom,
  tokenStorage,
} from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/apiInstance";
import EachUtils from "@/utils/EachUtils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavoritePage = () => {
  const [isHover, setIsHover] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);
  const [isFavorited] = useAtom(isFavoriteAtom);

  //
  const getFavoriteMovies = async () => {
    try {
      const url = `/movies/get-favorite/${email}/${token}`;

      const response = await apiInstanceExpress.get(url);
      if (response.status === 200) return response.data.data;
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    if (email && token) {
      getFavoriteMovies().then((result) => setFavoriteList(result));
    }
  }, [email, token, isFavorited]);

  return (
    <BrowseLayouts>
      <div className="w-full p-4 pt-40">
        <h1 className="mb-4 text-2xl font-semibold text-white ml-14">
          My Favorite Movies
        </h1>
        <h2 className="mb-4 text-lg text-gray-400 italic ml-16">
          {favoriteList.length > 0
            ? ""
            : "No favorite movies found. Start adding your favorites..."}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <EachUtils
            of={favoriteList}
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

      <ModalMovie />

      <ToastNotif />
    </BrowseLayouts>
  );
};
export default FavoritePage;
