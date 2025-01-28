import InputSearchMovies from "@mods/BrowsePage/InputSearchMovies";
import { LIST_NAVBAR } from "@/constants/listNavbar";
import EachUtils from "@/utils/EachUtils";
import AvatarMenu from "@mods/BrowsePage/AvatarMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="relative">
      <nav className="fixed top-0 left-0 z-10 w-full bg-transparent">
        <div className="flex items-center justify-between w-full px-2 sm:px-14 py-1.5 bg-gradient-to-b from-black to-transparent">
          {/* Kiri NAVBAR */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to={"/browse"}>
              <img
                src="/Netflix.png"
                alt="logo"
                className="transition-all w-28 hover:scale-105"
              />
            </Link>

            {/* Menu Navbar */}
            <ul className="hidden gap-8 ml-20 sm:flex">
              <EachUtils
                of={LIST_NAVBAR}
                render={(item, index) => (
                  <li
                    key={index}
                    className="font-semibold text-white hover:text-gray-400"
                  >
                    <Link to={item.url}>{item.title}</Link>
                  </li>
                )}
              />
            </ul>
          </div>

          {/* Kanan NAVBAR */}
          <div className="flex items-center sm:gap-4 sm:pr-10">
            {/* Search */}
            <InputSearchMovies />

            {/* Avatar */}
            <AvatarMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
