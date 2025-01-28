import { useAtom } from "jotai";
import React from "react";
import { languageAtom } from "@/jotai/atoms";
import { LIST_TITLE_EN, LIST_TITLE_ID } from "@/constants/listContent";

const SectionLayout = ({ children }) => {
  const [language] = useAtom(languageAtom);

  return (
    <section className="relative w-full p-2 bg-slate-950">
      <div className="max-w-6xl py-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold text-white">
          {language == "en" ? LIST_TITLE_EN : LIST_TITLE_ID}
        </h1>
        <div className="grid items-center justify-center grid-cols-1 gap-4 md:col-span-2 sm:grid-cols-4">
          {children}
        </div>
      </div>

      <div className="absolute left-0 w-full h-2 bottom-0-0 bg-stone-900"></div>
    </section>
  );
};
export default SectionLayout;
