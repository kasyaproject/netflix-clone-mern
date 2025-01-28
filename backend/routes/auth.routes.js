import express from "express";

import {
  SignInUser,
  SignOutUser,
  SignUpUser,
} from "../controllers/auth.controllers.js";
import { checkToken } from "./../utils/checkToken.js";

const router = express.Router();

router.post("/sign-in", SignInUser);
router.post("/sign-up", SignUpUser);
router.delete("/sign-out", checkToken, SignOutUser);

export default router;
