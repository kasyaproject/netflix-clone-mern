import { IoIosArrowForward } from "react-icons/io";

const DefaultButton = ({ text = "Button", onClick, style, isIcon = false }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 ${style}`}
    >
      {text}
      {isIcon && <IoIosArrowForward className="ml-2" />}
    </button>
  );
};
export default DefaultButton;
