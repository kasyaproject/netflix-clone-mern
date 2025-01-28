import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useAtom } from "jotai";

import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/utils/getMoviesByType";
import { getVideoURL } from "@/utils/getVideoURL";

import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const Jumbotron = () => {
  const navigate = useNavigate();

  const [topMovie, setTopMovie] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isMute, setIsMute] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const [idMovie, setIdMovie] = useState(null);
  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom); // Modal Movie

  useEffect(() => {
    const rand = Math.floor(Math.random() * 10);
    // Ambil data film dengan tipe 'now_playing'
    getMoviesByType({ moviesType: "now_playing" })
      .then((result) => {
        setTopMovie(result[rand]); // Set detail movie
        setIdMovie(result[rand].id); // Set idMovie
      })
      .catch((error) => console.error("Failed to fetch movies", error));
  }, []);

  useEffect(() => {
    if (idMovie) {
      // Ambil URL video berdasarkan idMovie
      getVideoURL({ movie_id: idMovie })
        .then((result) => setVideoUrl(result))
        .catch((error) => console.error("Failed to fetch video URL", error));
    }
  }, [idMovie]); // Efek ini hanya berjalan saat idMovie berubah

  return (
    <div className="relative w-full mb-2 h-[400px] md:h-[500px] lg:h-[90vh] overflow-hidden">
      {!isVideoEnded && videoUrl ? (
        <ReactPlayer
          url={"https://youtube.com/watch?v=" + videoUrl}
          // playing={isOpenModal || isOpenHeroModal ? false : true}
          playing={isOpenModal ? false : true}
          playbackRate={1}
          muted={isMute}
          width="100%"
          height={"100%"}
          onEnded={() => setIsVideoEnded(true)}
        />
      ) : (
        <img
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
            topMovie.backdrop_path
          }`}
          alt="cover_image"
        />
      )}

      {/* Detrail Trailer */}
      <div className="absolute flex items-end justify-between w-full h- gap-6 pl-1 text-white lg:pl-20 -translate-y-1/3 top-1/2">
        {/* Title and Sinopsis */}
        <div className="md:max-w-lg lg:max-w-2xl max-w-sm px-2">
          <h1 className="text-2xl font-bold md:text-5xl drop-shadow-md">
            {topMovie.title}
          </h1>
          <p className="mt-4 text-sm font-medium md:text-lg lg:text-2xl line-clamp-4 drop-shadow-md">
            {topMovie.overview}
          </p>

          {/* Button Play or Detail */}
          <div className="items-center hidden w-full gap-4 mt-4 lg:flex">
            <button
              onClick={() => {
                navigate("/watch/" + videoUrl);
                setIsMute(false);
              }}
              className="flex items-center gap-4 px-10 py-3 text-xl font-semibold text-black bg-white rounded-md hover:bg-gray-300"
            >
              <FaPlay size={25} />
              Putar
            </button>
            <button
              onClick={() => {
                setIdMovieAtom(idMovie);
                setIsOpenModal(true);
              }}
              className="flex items-center gap-4 px-10 py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-500"
            >
              <BsInfoCircle size={25} />
              Selengkapnya
            </button>
          </div>
        </div>

        {/* Button Mute or Unmute */}
        <div className="flex items-center gap-2">
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
          <p className="w-12 md:w-16 lg:w-20 py-2 pl-2 text-xl text-white border-l-4 border-white sm:pl-5 sm:w-40 bg-black/50">
            {topMovie.adult ? "18+" : "13+"}
          </p>
        </div>
      </div>

      {/* Gradient bg bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};
export default Jumbotron;
