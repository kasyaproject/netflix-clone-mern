import { apiInstanceExpress } from "@/utils/apiInstance";

export const checkFavoriteMovies = async ({ email, token, idMovie }) => {
  try {
    const isFavorite = await apiInstanceExpress.post("/movies/check-favorite", {
      email,
      token,
      movieId: idMovie,
    });

    // console.log({ email, token, idMovie });

    // console.log({ isFavorite });
    if (isFavorite.status === 200) return isFavorite.data.data.isFavorite;
  } catch (error) {
    console.log(error.message);
  }
};
