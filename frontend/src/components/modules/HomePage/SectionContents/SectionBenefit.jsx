import { useAtom } from "jotai";
import { LIST_CONTENT_EN, LIST_CONTENT_ID } from "@/constants/listContent";
import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { languageAtom } from "@/jotai/atoms";

const SectionEnjoy = () => {
  const [language] = useAtom(languageAtom);

  return (
    <SectionLayout>
      <EachUtils
        of={language == "en" ? LIST_CONTENT_EN : LIST_CONTENT_ID}
        render={(item, index) => (
          <div
            key={index}
            className="relative h-64 p-4 rounded-2xl sm:h-80 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"
          >
            <h1 className="pt-4 pb-6 text-2xl font-semibold text-white">
              {item.title}
            </h1>
            <p className="text-base font-semibold text-gray-400">{item.desc}</p>

            <img
              src={item.img}
              alt="icon-logo"
              className="absolute w-16 bottom-4 right-4"
            />
          </div>
        )}
      />
    </SectionLayout>
  );
};
export default SectionEnjoy;
