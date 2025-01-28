import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { searchMovieAtom } from "@/jotai/atoms";

const InputSearchMovies = () => {
  const [isShow, setIsShow] = useState(false);
  const [, setSearchMovies] = useAtom(searchMovieAtom);

  const handleChange = (e) => {
    if (e.target.value.length > 3) {
      setSearchMovies(e.target.value);
    } else {
      setSearchMovies(null);
    }
  };

  return (
    <motion.div
      initial={{ translateX: -20 }}
      animate={{ translateX: isShow ? 0 : -20 }}
      className="relative"
    >
      <input
        type="text"
        onChange={handleChange}
        className="pl-8 sm:pl-10 pr-5 bg-black border border-gray-500 rounded-full py-0.5 sm:py-2"
        placeholder="Search for a movie"
        style={{ display: isShow ? "block" : "none" }}
      />
      <GoSearch
        onClick={() => setIsShow(!isShow)}
        className={`${
          isShow
            ? "absolute -translate-y-1/2 left-2 sm:left-3 top-1/2 z-10"
            : "flex"
        } hover:cursor-pointer`}
        size={20}
      />
    </motion.div>
  );
};
export default InputSearchMovies;
