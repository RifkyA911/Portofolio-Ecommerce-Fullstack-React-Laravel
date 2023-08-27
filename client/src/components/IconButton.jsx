import { useRef, useState } from "react";

/* eslint-disable react/prop-types */
const IconButton = ({ children, text, color, ...props }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <button
      className={`flex items-center p-2 rounded-full text-white absolute right-2 bottom-0 ${
        color || "bg-red-500"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <div
        className="overflow-hidden text-xs md:text-sm h-4 transition-all duration-300 ease-out flex justify-center items-center"
        style={{
          width: hovered ? ref.current?.offsetWidth || 0 : 0,
        }}
      >
        <span ref={ref} className="px-1.5">
          {text}
        </span>
      </div>
      {children}
    </button>
  );
};

export default IconButton;
