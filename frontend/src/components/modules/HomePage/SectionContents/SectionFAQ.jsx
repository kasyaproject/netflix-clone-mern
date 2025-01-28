import { useState } from "react";
import { useAtom } from "jotai";
import { languageAtom } from "@/jotai/atoms";
import {
  FAQ_TITLE_EN,
  FAQ_TITLE_ID,
  LIST_FAQ_EN,
  LIST_FAQ_ID,
} from "@/constants/listFAQ";
import EachUtils from "@/utils/EachUtils";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const SectionFAQ = () => {
  const [language] = useAtom(languageAtom);
  const [openContentIndex, setOpenContentIndex] = useState(null);

  return (
    <div className="w-full p-5 sm:p-16 bg-slate-950">
      <div className="max-w-6xl py-8 mx-auto">
        <h2 className="mb-8 text-5xl font-black text-center text-white">
          {language == "en" ? FAQ_TITLE_EN : FAQ_TITLE_ID}
        </h2>

        <ul className="flex flex-col gap-2">
          <EachUtils
            of={language == "en" ? LIST_FAQ_EN : LIST_FAQ_ID}
            render={(item, index) => (
              <li key={index}>
                {/* Button to open content */}
                <div className="bg-[#2d2d2d] hover:bg-[#414141] text-white">
                  <button
                    onClick={() => {
                      setOpenContentIndex(
                        openContentIndex == index ? null : index
                      );
                    }}
                    className="flex items-center justify-between w-full p-8"
                  >
                    <span className="text-xl font-semibold text-left">
                      {item.title}
                    </span>

                    <motion.div
                      animate={{ rotate: openContentIndex == index ? 135 : 0 }}
                      className="hidden sm:block"
                    >
                      <FaPlus />
                    </motion.div>
                  </button>
                </div>

                {/* Content to be shown when button is clicked */}
                <motion.div
                  initial={{ translateY: -10 }}
                  animate={{ translateY: openContentIndex == index ? 0 : -10 }}
                  className="p-8 text-left bg-[#2d2d2d] text-white"
                  style={{
                    display: openContentIndex == index ? "block" : "none",
                  }}
                >
                  <p>{item.desc}</p>
                </motion.div>
              </li>
            )}
          />
        </ul>
      </div>
    </div>
  );
};
export default SectionFAQ;
