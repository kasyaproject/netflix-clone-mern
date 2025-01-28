import { emailAtom, languageAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LIST_REGIST_EN, LIST_REGIST_ID } from "@/constants/listRegist";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import EachUtils from "@/utils/EachUtils";
import ToastNotif from "@/components/modules/Common/ToastNotif";
import { apiInstanceExpress } from "@/utils/apiInstance";

const RegisterPage = () => {
  const [language] = useAtom(languageAtom);
  const navigate = useNavigate();

  const [emailMember, setEmail] = useAtom(emailAtom); // ambil email dari halaman jumbotron
  const [isShowPassword, setIsShowPassword] = useState(false); // menampilkan password
  const [isShowConfrmPassword, setIsShowConfrmPassword] = useState(false); // menampilkan confirm password
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk registrasi user
  const registerUser = async () => {
    // console.log({ formik });

    // jika ada validasi yang error
    try {
      setIsLoading(true);

      // registrasi user ke Authentication Firebase
      const regist = await createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );

      // jika registrasi berhasil simpan data profil ke collection
      if (regist) {
        await signOut(auth);

        // registrasi user ke MongoDb
        const addUser = await apiInstanceExpress.post("/auth/sign-up", {
          name: formik.values.name,
          username: formik.values.username,
          email: formik.values.email,
          password: formik.values.password,
          phone: formik.values.phone,
        });

        if (addUser.status === 201) {
          toast.success("Register Success");

          setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
          }, 2000);
        }
      }
    } catch (error) {
      // jika registrasi gagal
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // form input dan validasi
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: emailMember,
      password: "",
      confirmPassword: "",
      phone: "",
    },
    onSubmit: registerUser,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required()
        .min(6, "Name must be at least 6 characters")
        .max(18, "Name cannot exceed 18 characters"),
      username: yup
        .string()
        .required()
        .min(6, "Username must be at least 6 characters")
        .max(18, "Username cannot exceed 18 characters"),
      email: yup.string().email("Invalid email").required(),
      password: yup
        .string()
        .required()
        .min(6, "Password must be at least 6 characters")
        .max(18, "Password cannot exceed 18 characters"),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      phone: yup
        .string()
        .required()
        .min(6, "Phone number must be at least 6 characters")
        .max(14, "Phone number cannot exceed 14 characters"),
    }),
  });

  // fungsi untuk mengubah setiap field
  const handleInputChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <AuthLayouts>
      <EachUtils
        of={language == "en" ? LIST_REGIST_EN : LIST_REGIST_ID}
        render={(item, index) => (
          <div className="absolute z-10 w-full max-w-lg p-8 mx-auto mt-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-slate-950 rounded-xl">
            {/* Logo dan Judul */}
            <div className="flex flex-col items-center justify-center w-full mx-auto mb-10 -mt-5">
              <img src="/Netflix.png" className="w-52" alt="logo" />
              <h1 className="-mt-8 text-2xl font-bold text-white">
                {item.title}
              </h1>
            </div>

            {/* Form Register */}
            <form onSubmit={formik.handleSubmit} className="w-full">
              {/* Nama Lengkap Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`w-full px-3 pt-6 pb-2 placeholder-transparent border ${
                    formik.errors.name ? "border-red-600" : ""
                  } focus:border-none rounded-md peer bg-black/50`}
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Full Name
                </label>

                <label className="px-3 text-sm text-red-600">
                  {formik.errors.name}
                </label>
              </div>

              {/*Username Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  placeholder="Username"
                  className={`w-full px-3 pt-6 pb-2 placeholder-transparent border ${
                    formik.errors.username ? "border-red-600" : ""
                  } focus:border-none rounded-md peer bg-black/50`}
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Username
                </label>

                <label className="px-3 text-sm text-red-600">
                  {formik.errors.username}
                </label>
              </div>

              {/* Email Input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={handleInputChange}
                  placeholder={emailMember}
                  className={`w-full px-3 pt-6 pb-2 placeholder-transparent border ${
                    formik.errors.email ? "border-red-600" : ""
                  } focus:border-none rounded-md peer bg-black/50`}
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Email
                </label>

                <label className="px-3 text-sm text-red-600">
                  {formik.errors.email}
                </label>
              </div>

              {/* Password Input */}
              <div className="relative mb-6">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                  placeholder="password"
                  className={`w-full px-3 pt-6 pb-2 placeholder-transparent border ${
                    formik.errors.password ? "border-red-600" : ""
                  } focus:border-none rounded-md peer bg-black/50`}
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Password
                </label>

                <label className="px-3 text-sm text-red-600">
                  {formik.errors.password}
                </label>

                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute p-2 -translate-y-1/2 top-1/2 right-1"
                >
                  {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Password Confirmation Input */}
              <div className="relative mb-6">
                <input
                  type={isShowConfrmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleInputChange}
                  placeholder="Password Confirmation"
                  className={`w-full px-3 pt-6 pb-2 placeholder-transparent border ${
                    formik.errors.confirmPassword ? "border-red-600" : ""
                  } focus:border-none rounded-md peer bg-black/50`}
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Password Confirmation
                </label>

                <label className="px-3 text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </label>

                <button
                  type="button"
                  onClick={() => setIsShowConfrmPassword(!isShowConfrmPassword)}
                  className="absolute p-2 -translate-y-1/2 top-1/2 right-1"
                >
                  {isShowConfrmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Nomer Telp Input */}
              <div className="relative mb-6">
                <input
                  type="number"
                  name="phone"
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className={`w-full px-3 pt-6 pb-2 placeholder-transparent border ${
                    formik.errors.phone
                      ? "border-red-600 focus:border-red-600 "
                      : ""
                  }  rounded-md peer bg-black/50`}
                />
                <label
                  htmlFor="input"
                  className="absolute transition-all peer-invalid:top-1.5 text-white peer-invalid:left-6 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-1.5 peer-focus:left-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base text-xs left-6 top-1.5 "
                >
                  Phone Number
                </label>

                <label className="px-3 text-sm text-red-600">
                  {formik.errors.phone}
                </label>
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

            {/* Navigasi SIgn In */}
            <div className="flex items-center justify-between w-full mb-10">
              <p>
                {item.desc}{" "}
                <Link to="/login">
                  <span className="text-sm font-semibold text-white hover:underline">
                    {item.signin}
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
export default RegisterPage;
