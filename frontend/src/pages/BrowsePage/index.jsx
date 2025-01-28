import Jumbotron from "@mods/BrowsePage/Jumbotron";
import BrowseLayouts from "@/components/Layouts/BrowseLayouts";
import MovieList from "@mods/Common/MovieList";
import ModalMovie from "@mods/Common/ModalMovie";
import Footer from "@mods/BrowsePage/Footer";
import SearchMoviesPage from "@mods/BrowsePage/SearchMovies";

import { useAtom } from "jotai";
import { searchMovieAtom } from "@/jotai/atoms";
import ToastNotif from "@/components/modules/Common/ToastNotif";

function BrowsePage() {
  const [SearchMovies] = useAtom(searchMovieAtom);

  return (
    <BrowseLayouts>
      {SearchMovies ? (
        <SearchMoviesPage />
      ) : (
        <>
          <Jumbotron />

          <MovieList title={"Populer Movie"} moviesType="popular" />
          <MovieList title={"Trending Movie"} moviesType="top_rated" />
          <MovieList title={"New Release"} moviesType="now_playing" />
          <MovieList title={"Action"} moviesType="popular" />
        </>
      )}

      <Footer />

      <ModalMovie />

      <ToastNotif />
    </BrowseLayouts>
  );
}
export default BrowsePage;
