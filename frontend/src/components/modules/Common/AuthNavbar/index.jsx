import { Link } from "react-router-dom";

import OptionLanguage from "../../HomePage/OptionLanguage";
import { IoMdArrowRoundBack } from "react-icons/io";

const AuthNavbar = () => {
  return (
    <div className="absolute z-50 flex justify-between w-full h-20">
      <div className="flex items-center justify-between w-full px-8 mx-auto max-w-7xl">
        <Link to={"/"}>
          <IoMdArrowRoundBack size={40} className="hover:text-white" />
        </Link>

        <div>
          <OptionLanguage />
        </div>
      </div>
    </div>
  );
};
export default AuthNavbar;
