import React from "react";
import { JUMBOTRON_IMAGE } from "@/constants/listAssets";
import EachUtils from "@/utils/EachUtils";
import {
  LIST_JUMBOTRON_EN,
  LIST_JUMBOTRON_ID,
} from "@/constants/listJumbortron";
import { useAtom } from "jotai";
import { languageAtom } from "@/jotai/atoms";
import InputMembership from "@/components/modules/HomePage/InputMemebership";

const JumboTron = () => {
  const [language] = useAtom(languageAtom);

  return (
    <div>
      {/* Image bg */}
      <img
        src={JUMBOTRON_IMAGE}
        alt="background-img"
        className="absolute top-0 left-0 object-cover w-full h-screen "
      />
      {/* cover bg */}
      <div className="absolute top-0 left-0 z-10 w-full h-screen bg-black opacity-70"></div>

      {/* Content */}
      <EachUtils
        of={language == "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
        render={(item, index) => (
          <div
            key={index}
            className="relative z-10 flex flex-col items-center justify-center h-screen px-2 mx-auto mb-2 -mt-24 text-center text-white sm:max-w-7xl"
          >
            <h1 className="mb-8 text-3xl font-bold sm:text-7xl">
              {item.title}
            </h1>
            <p className="mb-4 text-sm font-semibold sm:text-2xl">
              {item.desc}
            </p>

            <InputMembership />
          </div>
        )}
      />
    </div>
  );
};
export default JumboTron;
