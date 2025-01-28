import LoadingPage from "@/components/modules/Common/LoadingPage";
import Navbar from "@/pages/HomePage/Navbar";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const DefaultLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <LoadingPage />;

  if (error) return <LoadingPage />;

  if (user) return location.replace("/browse");

  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};
export default DefaultLayout;
