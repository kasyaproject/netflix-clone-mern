import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultButton from "@/components/modules/HomePage/DefaultButton";
import OptionLanguage from "@/components/modules/HomePage/OptionLanguage";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="relative z-50 w-full">
      <nav className="flex items-center justify-between px-5 mx-auto max-w-7xl max-sm:py-1">
        {/* Logo web */}
        <div>
          <img src="/Netflix.png" alt="logo" className="w-32 sm:w-44" />
        </div>

        <div className="flex items-center space-x-4">
          {/* Pilihan bahasa */}
          <OptionLanguage />

          {/* Tombol sign in */}
          <DefaultButton
            style={"sm:block hidden"}
            text="Sign in"
            onClick={() => navigate("/login")}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
