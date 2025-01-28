import { useState } from "react";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { emailStorage, languageAtom, tokenStorage } from "@/jotai/atoms";
import * as yup from "yup";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { toast } from "react-toastify";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { LIST_LOGIN_EN, LIST_LOGIN_ID } from "@/constants/listLogin";
import { auth } from "@/utils/firebase";
import EachUtils from "@/utils/EachUtils";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import ToastNotif from "@/components/modules/Common/ToastNotif";
import { apiInstanceExpress } from "@/utils/apiInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [language] = useAtom(languageAtom);
  const [, setTokenStorage] = useAtom(tokenStorage);
  const [, setEmailStorage] = useAtom(emailStorage);

  // Fungsi Login User
  const loginUser = async () => {
    console.log({ formik });

    try {
      setIsLoading(true);

      // Ambil data dari form dan mencoba login dengan auth firebase
      const login = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );

      // ambil token dari Firebase Auth
      const firebaseToken = await getIdToken(login.user);

      // simpan token ke MongoDb
      const addToken = await apiInstanceExpress.post("/auth/sign-in", {
        email: formik.values.email,
        password: formik.values.password,
        token: firebaseToken,
      });
      if (addToken.status !== 200)
        return toast.error("Can't sign in now, try again later!");

      // Jika berhasil, simpan token ke local storage dan navigate ke /browse
      setTokenStorage(firebaseToken);
      setEmailStorage(login.user.email);

      toast.success(
        "Login successful! Please wait, redirecting to the homepage."
      );

      // redirect ke halaman utama
      setTimeout(() => {
        setIsLoading(false);
        navigate("/browse");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.code);
    }
  };

  // form input dan validasi
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginUser,
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required(),
      password: yup.string().required(),
    }),
  });

  // fungsi untuk menampung setiap field
  const handleInputChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <AuthLayouts>
      <EachUtils
        of={language == "en" ? LIST_LOGIN_EN : LIST_LOGIN_ID}
        render={(item, index) => (
          <div className="absolute z-10 w-full max-w-lg p-8 mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-slate-950 rounded-xl">
            {/* Logo dan Judul */}
            <div className="flex flex-col items-center justify-center w-full mx-auto mb-10">
              <img src="/Netflix.png" className="w-52" alt="logo" />
              <h1 className="-mt-8 text-2xl font-bold text-white">
                {item.title}
              </h1>
            </div>

            {/* Form Login */}
            <form onSubmit={formik.handleSubmit} className="w-full">
              {/* Username/Email Input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-3 pt-6 pb-2 placeholder-transparent border rounded-md peer bg-black/50"
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base left-6"
                >
                  Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative mb-6">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                  placeholder="password"
                  className="w-full px-3 pt-6 pb-2 placeholder-transparent border rounded-md peer bg-black/50"
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute p-2 -translate-y-1/2 top-1/2 right-1"
                >
                  {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 mt-4 mb-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-700"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  item.title
                )}
              </button>
            </form>

            {/* Navigasi Register */}
            <div className="flex items-center justify-between w-full mb-10">
              <p>
                {item.desc}{" "}
                <Link to={"/register"}>
                  <span className="text-sm font-semibold text-white hover:underline">
                    {item.regist}
                  </span>
                </Link>
              </p>
            </div>
          </div>
        )}
      />

      <ToastNotif />
    </AuthLayouts>
  );
};
export default LoginPage;
