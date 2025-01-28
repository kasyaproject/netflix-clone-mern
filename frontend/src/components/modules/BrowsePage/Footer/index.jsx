import React from "react";
import EachUtils from "@/utils/EachUtils";
import { CREDIT_FOOTER_ID, LIST_FOOTER_ID } from "@/constants/listFooter";

const Footer = () => {
  return (
    <div className="w-full pb-4">
      <div className="flex flex-col items-center justify-center max-w-5xl px-10 mx-auto text-sm">
        <div className="flex items-center w-full gap-6 px-4">
          <a href="#">
            <img
              src="https://img.icons8.com/?size=100&id=118490&format=png&color=ffffff"
              alt="facebook"
              className="w-7 h-7"
            />
          </a>
          <a href="#">
            <img
              src="https://img.icons8.com/?size=100&id=85154&format=png&color=ffffff"
              alt="instagram"
              className="w-7 h-7"
            />
          </a>
          <a href="#">
            <img
              src="https://img.icons8.com/?size=100&id=102907&format=png&color=ffffff"
              alt="twitter"
              className="w-7 h-7"
            />
          </a>
          <a href="#">
            <img
              src="https://img.icons8.com/?size=100&id=37326&format=png&color=ffffff"
              alt="youtube"
              className="w-7 h-7"
            />
          </a>
        </div>

        <ul className="grid w-full grid-cols-2 gap-3 py-4 sm:grid-cols-4">
          <EachUtils
            of={LIST_FOOTER_ID}
            render={(item, index) => (
              <li key={index}>
                <a href={item.url} className="hover:underline">
                  {item.title}
                </a>
              </li>
            )}
          />
        </ul>

        <div className="flex items-center justify-center w-full">
          <span className="text-sm text-white">{CREDIT_FOOTER_ID}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
