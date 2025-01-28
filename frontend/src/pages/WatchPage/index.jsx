import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import LoadingPage from "@/components/modules/Common/LoadingPage";
import { useAtom } from "jotai";
import { emailStorage, tokenStorage } from "@/jotai/atoms";

const WatchPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);

  const { id } = useParams();

  const [isPlaying, setIsPlaying] = useState(true);

  if (loading) return <LoadingPage />;

  if (error) return <LoadingPage />;

  if (!user && !email && !token) return location.replace("/login");

  return (
    <div
      onClick={() => setIsPlaying(!isPlaying)}
      className="w-full h-screen group"
    >
      {/* Back Button */}
      <Link
        to={"/browse"}
        className="absolute hidden transition-all duration-1000 top-10 left-14 group-hover:block"
      >
        <IoMdArrowRoundBack size={40} className="hover:text-white" />
      </Link>

      {/* Control Button */}
      <div className="absolute hidden transition-all duration-1000 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 group-hover:block">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-5 border-4 rounded-full hover:text-white"
        >
          {isPlaying ? <FaPlay size={50} /> : ""}
        </button>
      </div>

      {/* Video Player */}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}&modestbranding=1&rel=0&controls=0`}
        width={"100%"}
        height={"100vh"}
        playing={isPlaying}
        controls={false}
        muted={false}
      />

      {/* Detail Movie */}
      <div className={`absolute hidden group-hover:block top-[65%] left-32 `}>
        <div className={`${isPlaying ? "hidden" : "block"}`}>
          <h1 className="text-4xl font-bold text-white">Tittle</h1>
          <p>Desc</p>
        </div>
      </div>
    </div>
  );
};
export default WatchPage;
