import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./css/index.css";
import BrowsePage from "@/pages/BrowsePage";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import WatchPage from "@/pages/WatchPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import FavoritePage from "@/pages/FavoritePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  // Auth
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/browse",
    element: <BrowsePage />,
  },
  {
    path: "/watch/:id",
    element: <WatchPage />,
  },
  {
    path: "/favorite",
    element: <FavoritePage />,
  },

  // Halaman Error
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
