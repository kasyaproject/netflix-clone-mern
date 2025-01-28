import { useAtom } from "jotai";
import {
  CALL_FOOTER_EN,
  CALL_FOOTER_ID,
  CREDIT_FOOTER_EN,
  CREDIT_FOOTER_ID,
  LIST_FOOTER_EN,
  LIST_FOOTER_ID,
} from "@/constants/listFooter";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import OptionLanguage from "@/components/modules/HomePage/OptionLanguage";

const Footer = () => {
  const [language] = useAtom(languageAtom);

  return (
    <footer className="w-full p-8 text-white bg-black border-t-8 border-stone-900">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {language == "en" ? CALL_FOOTER_EN : CALL_FOOTER_ID}{" "}
            <a href="" className="hover:underline">
              123-456-789
            </a>
          </span>

          <OptionLanguage />
        </div>

        <ul className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          <EachUtils
            of={language == "en" ? LIST_FOOTER_EN : LIST_FOOTER_ID}
            render={(item, index) => (
              <li key={index}>
                <a href={item.url} className="underline">
                  {item.title}
                </a>
              </li>
            )}
          />
        </ul>

        <div className="flex items-center justify-center w-full">
          <span className="text-sm text-white">
            {language == "en" ? CREDIT_FOOTER_EN : CREDIT_FOOTER_ID}
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
