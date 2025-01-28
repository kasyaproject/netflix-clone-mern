import { emailStorage, tokenStorage } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/apiInstance";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const AvatarMenu = () => {
  const navigate = useNavigate();
  const [token, setTokenStorage] = useAtom(tokenStorage);
  const [email, setEmailStorage] = useAtom(emailStorage);

  const handleSignOut = async () => {
    const data = { email, token };

    const dbSignOut = await apiInstanceExpress.delete("/auth/sign-out", {
      data,
    });

    if (dbSignOut.status === 201) {
      // Clear the token and email from storage
      signOut(auth).then(() => {
        setTokenStorage(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
  };

  return (
    <div className="flex dropdown dropdown-hover dropdown-end">
      {/* Avatar Img */}
      <div className="avatar" tabIndex={0}>
        <div className="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      {/* Avatar Dropdown */}
      <div
        tabIndex={0}
        className="w-40 p-2 border rounded-md bg-black/50 dropdown-content top-10"
      >
        <button
          onClick={() => console.log("Profil button")}
          className="w-full px-2 py-0.5 text-left rounded hover:bg-gray-500"
        >
          Profil
        </button>
        <button
          onClick={handleSignOut}
          className="w-full px-2 py-0.5 text-left rounded hover:bg-gray-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default AvatarMenu;
