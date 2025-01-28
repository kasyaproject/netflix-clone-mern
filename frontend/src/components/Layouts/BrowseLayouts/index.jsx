import React from "react";
import Navbar from "@/pages/BrowsePage/Navbar";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "@/components/modules/Common/LoadingPage";
import { useAtom } from "jotai";
import { emailStorage, tokenStorage } from "@/jotai/atoms";

const BrowseLayouts = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);

  if (loading) return <LoadingPage />;

  if (error) return <LoadingPage />;

  if (!user && !email && !token) return location.replace("/login");

  return (
    <div className="w-full min-h-screen bg-slate-950">
      <Navbar />

      <div>{children}</div>
    </div>
  );
};
export default BrowseLayouts;
