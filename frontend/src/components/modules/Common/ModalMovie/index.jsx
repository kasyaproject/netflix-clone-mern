import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  emailStorage,
  idMovieAtom,
  isOpenModalAtom,
  tokenStorage,
} from "@/jotai/atoms";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { runtimeFormatter } from "@/utils/runtimeForamter";
import Recommendation from "@mods/Common/ModalMovie/Recommendation";
import { getMoviesDetail } from "@/utils/getMovieDetail";
import { getVideoURL } from "@/utils/getVideoURL";

import {
  IoClose,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import { FaPlay, FaPlus } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { getGenres } from "@/utils/getGenres";
import { toast } from "react-toastify";
import { apiInstanceExpress } from "@/utils/apiInstance";

const ModalMovie = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useAtom(isOpenModalAtom);
  const [isMute, setIsMute] = useState(false);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);

  const [movieDetail, setMovieDetail] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    if (idMovie && isOpen) {
      getMoviesDetail({ movie_id: idMovie }).then((result) =>
        setMovieDetail(result)
      );

      getVideoURL({ movie_id: idMovie }).then((result) => setVideoURL(result));
    }
  }, [idMovie, isOpen]);

  const handleFavorite = async () => {
    if (email && token) {
      try {
        const addMovieFavorite = await apiInstanceExpress.post(
          "/movies/add-favorite",
          {
            email,
            token,
            data: movieDetail,
          }
        );
        if (!addMovieFavorite.status === 201)
          return toast.error("Failed to add favorite movie");
        toast.success(addMovieFavorite.data.message);
      } catch (error) {
        toast.error(error.code);
      }
    }
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="flex flex-col max-w-4xl p-0 rounded-[15px] modal-box bg-gray-900">
        <div className="relative w-full h-1/2">
          {/* Triler Movies */}
          {!isVideoEnded && videoURL ? (
            <ReactPlayer
              url={"https://youtube.com/watch?v=" + videoURL}
              playing={isOpen ? true : false}
              playbackRate={1}
              muted={isMute}
              width={"100%"}
              height={"560px"}
              onEnded={() => setIsVideoEnded(true)}
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
                movieDetail.backdrop_path
              }`}
              alt="cover_image"
            />
          )}

          <div className="absolute w-full -translate-y-1/2 top-[60%] px-8">
            <div className="flex flex-col w-full text-white">
              {/* Movie Tittle */}
              <div className="w-1/2 mb-2">
                <img src="/Netflix.png" className="w-10" alt="tittle-movie" />
                <h1 className="text-4xl font-semibold">{movieDetail?.title}</h1>
              </div>

              {/* Movies Control */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigate("/watch/" + videoURL);
                      setIsOpen(false);
                      setVideoURL(null);
                      setIdMovie(null);
                      setMovieDetail([]);
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-2 text-black bg-white rounded-md hover:bg-gray-300"
                  >
                    <FaPlay size={20} />
                    <p className="text-2xl">Putar</p>
                  </button>
                  <button
                    onClick={handleFavorite}
                    className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:border-white"
                  >
                    <FaPlus size={20} />
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:border-white">
                    <AiOutlineLike size={20} />
                  </button>
                </div>

                <button
                  onClick={() => setIsMute(!isMute)}
                  className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full sm:w-12 sm:h-12"
                >
                  {isMute ? (
                    <IoVolumeMuteOutline size={25} />
                  ) : (
                    <IoVolumeHighOutline size={25} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Button close modal */}
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="absolute p-2 font-semibold text-white rounded-full top-2 right-2 bg-black/30 hover:bg-black/70"
          >
            <IoClose size={20} />
          </button>

          {/* Gradien background */}
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent"></div>
        </div>

        {/* Detail Movies */}
        <div className="flex gap-10 px-8 pb-10">
          {/* Movies Detail */}
          <div className="flex flex-col flex-1 gap-1">
            {/* Date + Runtime */}
            <div className="flex items-center gap-2">
              <p className="font-semibold">
                {movieDetail?.release_date?.split("-")[0]}
              </p>
              <p className="font-semibold">
                {runtimeFormatter(movieDetail?.runtime)}
              </p>
            </div>

            {/* Age rate + Genre */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <p className="px-2 border">
                {movieDetail?.adult === "true" ? "18+" : "13+"}
              </p>
              <p>{getGenres(movieDetail?.genres)}</p>
            </div>

            {/* Overview */}
            <p className="mt-8 font-semibold text-white">
              {movieDetail?.overview}
            </p>
          </div>

          {/* Author Movies */}
          <div className="flex flex-col gap-4 text-sm font-semibold w-60">
            {/* Sutradara */}
            <p>
              Sutradara : <span className="text-white">-</span>
            </p>

            {/* Pemeran */}
            <p>
              Pemeran : <span className="text-white">-</span>
            </p>

            {/* Type */}
            <p>
              Genre : <span className="text-white">-</span>
            </p>
          </div>
        </div>

        {/* Recomendation */}
        <Recommendation />
      </div>
    </dialog>
  );
};
export default ModalMovie;
