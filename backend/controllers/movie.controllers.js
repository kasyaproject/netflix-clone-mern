import User from "../models/user.model.js";
import { OK, ERR } from "../utils/response.js";

export const getFavoriteMovies = async (req, res) => {
  return OK(res, 200, req.user.favorites, "Get favorite movies success!");
};

export const addFavoriteMovie = async (req, res) => {
  try {
    const { data } = req.body; // ambil data dari body
    const user = await User.findById(req.user._id); // ambil user berdasarkan id

    // cek apakah movie sudah ada di favorite
    const isFavorite = user.favorites.some(
      (favorite) => favorite.id === data.id
    );

    // jika movie sudah ada di favorites, maka hapus dari data
    if (isFavorite) {
      // Remove dari favorites
      await User.findByIdAndUpdate(user._id, {
        $pull: { favorites: data },
      });
    } else {
      // Add ke favorites
      await User.findByIdAndUpdate(user._id, {
        $push: { favorites: data },
      });
    }

    // Ambil user terbaru setelah update
    const updatedUser = await User.findById(req.user._id);

    // Pesan berhasil
    return OK(
      res,
      201,
      updatedUser.favorites,
      isFavorite
        ? "Remove Favorite Movie Success!"
        : "Add Favorite Movie Success!"
    );
  } catch (error) {
    return ERR(res, 500, "Error di : addFavoriteMovie");
  }
};

export const checkFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;

    const user = await User.findById(req.user._id);

    const isFavorite = user.favorites.some(
      (favorite) => favorite.id === movieId
    );

    return OK(res, 200, { isFavorite }, "Check favorite movie success!");
  } catch (error) {
    return ERR(res, 500, "Error di : checkFavorite");
  }
};
