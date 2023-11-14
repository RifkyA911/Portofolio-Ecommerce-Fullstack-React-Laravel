import React, { useState } from "react";
import { motion } from "framer-motion";
import { ReactIcons } from "../utils/RenderIcons";

const Tooltips = (props) => {
  const { className, text, iconName, position, spanClassName, children } =
    props;
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const tooltipVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={className ?? `relative w-fit  text-center`}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {children}
      {isTooltipVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tooltipVariants}
          transition={{ duration: 0.2 }}
          className={
            spanClassName ??
            `absolute bottom-[-44px] bg-gray-700 text-slate-100 text-xs  px-2 py-1 rounded-sm ${position}`
          }
        >
          {text}
          <span
            className={`absolute ${
              position === "bottom" ? "top-full" : "bottom-[85%]"
            } left-1/2 transform -translate-x-1/2 text-gray-700`}
          >
            {/* Panah */}
            <ReactIcons iconName={"BiSolidUpArrow"} />
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Tooltips;
