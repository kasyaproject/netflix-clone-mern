import express from "express";
import {
  addFavoriteMovie,
  checkFavorite,
  getFavoriteMovies,
} from "../controllers/movie.controllers.js";
import { checkToken } from "../utils/checkToken.js";

const router = express.Router();

router.get("/get-favorite/:email/:token", checkToken, getFavoriteMovies);
router.post("/add-favorite", checkToken, addFavoriteMovie);
router.post("/check-favorite", checkToken, checkFavorite);

export default router;
