import { emailStorage, isFavoriteAtom, tokenStorage } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/apiInstance";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";
import { getVideoURL } from "@/utils/getVideoURL";
import { runtimeFormatter } from "@/utils/runtimeForamter";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FaCheck, FaPlay, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const [videoUrl, setVideoURL] = useState(null);

  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);

  const handleFavorite = async () => {
    if (email && token) {
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

        toast.success(addMovieFavorite.data.message);
      } catch (error) {
        toast.error(error.code);
      }
    }
  };

  return (
    <div
      onClick={() => navigate("/watch/" + videoUrl)}
      onMouseEnter={() => {
        getVideoURL({ movie_id: data.id }).then((result) =>
          setVideoURL(result)
        );
      }}
      className="relative w-full cursor-pointer border h-[350px] overflow-hidden rounded-md group"
    >
      {/* Cover Movies */}
      <div className="relative w-full h-36">
        <img
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${
            data.backdrop_path
          }`}
          alt="Movie Image"
          className="object-cover w-full h-full"
        />

        {/* Title */}
        <p className="absolute w-1/2 text-base font-bold text-white bottom-6 left-2">
          {data.title}
        </p>
      </div>

      {/* Description */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2 ">
          <div className="flex items-center gap-2">
            <p className="px-2 py-0 font-semibold border">
              {data.adult === "true" ? "18+" : "13+"}
            </p>
            <p className="font-semibold">{data.release_date.split("-")[0]}</p>
          </div>

          {/* Button Add */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Mencegah event onClick pada div dipanggil
              handleFavorite();
            }}
            className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:border-white"
          >
            {/* {isFavoriteMovie ? <FaCheck size={20} /> : <FaPlus size={20} />} */}
          </button>
        </div>

        {/* Overview */}
        <p className="text-sm font-semibold line-clamp-6">{data.overview}</p>
      </div>

      {/* ALL ABSOLUTE */}
      {/* Logo */}
      <div className="absolute z-10 top-2 left-2">
        <img src="/Netflix.png" className="w-10" alt="logo-netflix" />
      </div>

      {/* Runtime */}
      <div className="absolute z-10 top-2 right-2">
        <p className="font-semibold text-white">
          {runtimeFormatter(data.runtime)}
        </p>
      </div>

      {/* Button Play when its hover */}
      <div className="absolute hidden transition-all duration-300 -translate-x-1/2 top-10 left-1/2 group-hover:block">
        <p className="flex items-center justify-center w-12 h-12 text-white border-2 border-gray-300 rounded-full bg-black/50 ">
          <FaPlay size={20} />
        </p>
      </div>
    </div>
  );
};
export default Card;
