import axios from "axios";

// Api instance untuk mengakses data di TMDB
export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_TMDB,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TMDB}`,
  },
});

// Api instance untuk mengakses data di EXPRESS
export const apiInstanceExpress = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_EXPRESS,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
