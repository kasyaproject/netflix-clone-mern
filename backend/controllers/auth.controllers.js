import argon2 from "argon2";

import { OK, ERR } from "../utils/response.js";
import User from "../models/user.model.js";

export const SignInUser = async (req, res) => {
  try {
    // ambil email, password dan token dari firebase
    const { email, password, token } = req.body;

    // cari user sesuai email
    const user = await User.findOne({ email });

    if (!user) return ERR(res, 404, "User Not Found!");

    // cek apakah password sudah sesuai dengan user
    const hashedPassword = await argon2.verify(user.password, password);

    if (!hashedPassword) return ERR(res, 400, "Wrong Password!");

    // jika password sudah sesuai, maka simpan token ke DB dan user bisa login
    user.token = token;

    await user.save();

    return OK(res, 200, email, "Sign In Success!");
  } catch (error) {
    return ERR(res, 500, "Error di : SignInToken = " + error);
  }
};

export const SignUpUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;
  const hashPass = await argon2.hash(password);

  try {
    // validasi jika email sudah digunakan
    const user = await User.findOne({ email });

    if (user) return ERR(res, 409, "Email already used!");

    // jika email belum digunakan maka buat user baru
    const newUser = new User({
      name,
      username,
      email,
      password: hashPass,
      phone,
      token: null,
    });
    await newUser.save();

    return OK(res, 201, email, "Sign Up Success!");
  } catch (error) {
    return ERR(res, 500, "Error di : SignUpToken");
  }
};

export const SignOutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // cari data berdasarkan _id
    user.token = null; // set token kosong

    await user.save(); // simpan data user

    return OK(res, 201, null, "Sign Out Success!");
  } catch (error) {
    return ERR(res, 500, "Error di : SignOutToken = " + error);
  }
};

export const getUserProfile = async (req, res) => {};
