import { useAtom } from "jotai";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";
import EachUtils from "@/utils/EachUtils";
import DefaultButton from "@/components/modules/HomePage/DefaultButton";
import { emailAtom, languageAtom } from "@/jotai/atoms";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const InputMembership = () => {
  const navigate = useNavigate();

  const [language] = useAtom(languageAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const handleEmail = (e) => {
    e.preventDefault();

    navigate("/register");
  };

  return (
    <form action="" className="w-full">
      <EachUtils
        of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, index) => (
          <div key={index}>
            <h3 className="mb-4 text-sm sm:text-base">{item.title}</h3>

            <div className="relative flex flex-col items-center justify-center w-full gap-4 p-2 sm:flex-row">
              <input
                type="email"
                placeholder={item.labelInput}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pt-5 placeholder-transparent border rounded-md sm:w-1/2 peer bg-black/50"
              />
              <label
                htmlFor="input"
                className={`absolute transition-all peer-invalid:top-2.5 peer-invalid:text-xs peer-focus:text-xs -z-10 peer-focus:top-2.5 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base left-5 ${
                  language == "en" ? "sm:left-64" : "sm:left-72"
                }`}
              >
                {item.labelInput}
              </label>

              <button
                onClick={handleEmail}
                type="submit"
                className="px-4 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 flex flex-shrink-0 text-xl items-center py-4"
              >
                {item.buttonSubmit}
                <IoIosArrowForward className="ml-2" />
              </button>
            </div>
          </div>
        )}
      />
    </form>
  );
};
export default InputMembership;
