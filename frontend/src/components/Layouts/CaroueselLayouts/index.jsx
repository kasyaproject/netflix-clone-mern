import React, { useRef } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const CaroueselLayouts = ({ children }) => {
  const ref = useRef(null);

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };

  return (
    <div className="relative overflow-hidden group">
      <div className="absolute left-0 flex justify-between w-full h-72">
        <button
          onClick={() => scroll(-900)}
          className="z-10 h-full md:h-36 lg:h-48 text-white transition-all ease-in-out opacity-0 group-hover:opacity-100 hover:bg-black/50"
        >
          <GoChevronLeft size={50} />
        </button>

        <button
          onClick={() => scroll(900)}
          className="z-10 h-full md:h-36 lg:h-48 text-white transition-all ease-in-out opacity-0 group-hover:opacity-100 hover:bg-black/50"
        >
          <GoChevronRight size={50} />
        </button>
      </div>

      <div ref={ref} className="relative gap-4 carousel scroll-smooth">
        {children}
      </div>
    </div>
  );
};
export default CaroueselLayouts;
