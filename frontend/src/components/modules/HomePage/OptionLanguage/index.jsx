import { MdOutlineGTranslate } from "react-icons/md";
import EachUtils from "@/utils/EachUtils";
import { LIST_LANGUAGES } from "@/constants/listLanguage";
import { useAtom } from "jotai";
import { languageAtom } from "@/jotai/atoms";

const OptionLanguage = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  const handleChange = (e) => {
    setLanguage(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="relative items-center py-1 space-x-2 border border-gray-300 rounded-md bg-black/50">
      <MdOutlineGTranslate className="absolute hidden left-3 top-2 sm:block" />

      <select
        onClick={handleChange}
        className="px-2 text-white bg-transparent sm:px-6 focus:outline-none"
      >
        <EachUtils
          of={LIST_LANGUAGES}
          render={(item, index) => (
            <option
              key={index}
              value={item.value}
              className="font-semibold text-black"
            >
              {item.name}
            </option>
          )}
        />
      </select>
    </div>
  );
};
export default OptionLanguage;
