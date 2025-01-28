import User from "../models/user.model.js";
import { ERR } from "./response.js";

export const checkToken = async (req, res, next) => {
  // ambil email dan token dari form/params
  const email = req.body.email || req.params.email;
  const token = req.body.token || req.params.token;

  // cek apakah email dan token ada
  if (!email || !token) {
    return ERR(res, 400, "Error, No Data Provided");
  }

  try {
    const user = await User.findOne({ email, token }); // Cari user berdasarkan email dan token

    // Jika user tidak ditemukan, kembalikan error
    if (!user) {
      return ERR(res, 401, "Invalid Token");
    }

    // Jika user ditemukan, lanjutkan ke proses berikutnya
    req.user = user;
    next();
  } catch (error) {
    return ERR(res, 500, "Error, Can't check Token!");
  }
};
