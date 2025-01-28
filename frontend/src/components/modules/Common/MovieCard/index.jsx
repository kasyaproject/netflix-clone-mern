import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  emailStorage,
  idMovieAtom,
  isFavoriteAtom,
  isFetchingAtom,
  isOpenModalAtom,
  tokenStorage,
} from "@/jotai/atoms";
import { FaPlayCircle } from "react-icons/fa";
import { GoCheckCircle, GoChevronDown, GoPlusCircle } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";

import { runtimeFormatter } from "@/utils/runtimeForamter";
import { getVideoURL } from "@/utils/getVideoURL";
import { getMoviesDetail } from "@/utils/getMovieDetail";
import { getGenres } from "@/utils/getGenres";
import Skeleton from "./skeleton";
import { apiInstanceExpress } from "@/utils/apiInstance";
import { toast } from "react-toastify";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";

const MovieCard = ({ data, isHover, setIsHover }) => {
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState([]);
  const [videoURL, setVideoURL] = useState([]);

  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFetching] = useAtom(isFetchingAtom);
  const [isFavoriteMovie, setIsFavoriteMovie] = useAtom(isFavoriteAtom);

  const handleFavorite = async () => {
    if (!email && !token) return;

    try {
      const addMovieFavorite = await apiInstanceExpress.post(
        "/movies/add-favorite",
        {
          email,
          token,
          data,
        }
      );
      if (!addMovieFavorite.status === 201)
        return toast.error("Failed to add favorite movie");

      setIsFavoriteMovie(!isFavoriteMovie);

      toast.success(addMovieFavorite.data.message);
    } catch (error) {
      toast.error(error.code);
    }
  };

  if (isFetching) return <Skeleton />;

  return (
    <>
      {isHover && idMovie === data.id ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0, ease: "easeInOut" }}
          className="relative transition-all rounded-xl shadow-md w-full bg-[#141414]"
        >
          {/* Video Player */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoURL}`}
            playing={isHover ? true : false}
            muted={isHover ? true : false}
            loop={true}
            width={"100%"}
            height={"160px"}
            controls={false}
          />
          <div className="h-auto justify-center px-2 py-4 flex flex-col gap-1.5">
            {/* Button Section */}
            <section className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/watch/" + videoURL)}>
                  <FaPlayCircle size={32} />
                </button>
                {!email && !token ? (
                  ""
                ) : (
                  <>
                    <button onClick={handleFavorite}>
                      {isFavoriteMovie ? (
                        <GoCheckCircle size={32} />
                      ) : (
                        <GoPlusCircle size={32} />
                      )}
                    </button>
                    <button>
                      <AiOutlineLike size={32} />
                    </button>
                  </>
                )}
              </div>

              <div>
                <button
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  <GoChevronDown size={32} />
                </button>
              </div>
            </section>

            {/* Detail Movie */}
            <section className="mt-2">
              <div className="flex items-start gap-2 px-4">
                <h2 className="font-semibold text-sm sm:text-md">
                  {movieDetail?.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-green-400 text-nowrap">
                  {runtimeFormatter(movieDetail?.runtime)}
                </p>
              </div>

              <div className="flex items-center gap-2 px-2 mt-2 mx-2 text-xs sm:text-sm font-semibold text-white line-clamp-1 text-nowrap">
                <p>{getGenres(movieDetail?.genres)}</p>
              </div>
            </section>
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-72">
          <img
            onMouseEnter={() => {
              setIsHover(true);
              setIdMovie(data.id);
              // it's fetching data for detail on card
              getMoviesDetail({ movie_id: data.id }).then((result) =>
                setMovieDetail(result)
              );
              getVideoURL({ movie_id: data.id }).then((result) =>
                setVideoURL(result)
              ); // it's fetching data for video on card
              // Check it's data favorite or not
              checkFavoriteMovies({ email, token, idMovie: data.id }).then(
                (result) => setIsFavoriteMovie(result)
              );
            }}
            src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
              data.backdrop_path
            }`}
            className="h-full md:h-36 lg:h-48 w-full object-cover rounded-xl"
            alt="img-cover"
          />
        </div>
      )}
    </>
  );
};

export default MovieCard;
