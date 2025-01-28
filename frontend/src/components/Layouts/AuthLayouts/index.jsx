import AuthNavbar from "@/components/modules/Common/AuthNavbar";
import LoadingPage from "@/components/modules/Common/LoadingPage";
import { JUMBOTRON_IMAGE } from "@/constants/listAssets";
import { emailStorage, tokenStorage } from "@/jotai/atoms";
import { auth } from "@/utils/firebase";
import { useAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthLayouts = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [email] = useAtom(emailStorage);
  const [token] = useAtom(tokenStorage);

  if (loading) return <LoadingPage />;

  if (error) return <LoadingPage />;

  if (user && email && token) return location.replace("/browse");

  return (
    <div className="w-full min-h-screen bg-slate-950">
      <AuthNavbar />

      <img
        src={JUMBOTRON_IMAGE}
        className="object-cover w-full h-full "
        alt="background-img"
      />
      <div className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70"></div>

      <div>{children}</div>
    </div>
  );
};
export default AuthLayouts;
