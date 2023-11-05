import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { MuiIcon } from "../utils/RenderIcons";
import { debounce } from "lodash";
import { Transition } from "@headlessui/react";

const notificationVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: { duration: 0.1 },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: { ease: "easeOut", duration: 0.15 },
  },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
};

export const FormToast = (props) => {
  const { className, formType, icon, span, type, size, onClick, children } =
    props;

  const [notification, setNotification] = useState(null);
  const [styleToast, setStyleToast] = useState({
    bg: null,
    className: null,
    icon: {
      name: null,
      color: null,
    },
    span: null,
  });

  useEffect(() => {
    if (formType == "default") {
      setStyleToast({
        ...styleToast,
        bg: "bg-slate-50",
        className: `${className} mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`,
        icon: icon,
        span: span,
      });
    } else if (formType == "apply") {
      setStyleToast({
        ...styleToast,
        bg: "bg-slate-100 rounded-md shadow-lg",
        className: `${className}`,
        icon: {
          name: icon ?? "CheckCircleRounded",
          color: "text-green-600",
        },
        span: span ?? "Apply",
      });
    }
  }, [formType, onClick]);

  return (
    <>
      <motion.div
        className={`fixed left-5 bottom-5 z-[999999999999999] cursor-pointer p-0 min-w-[15.0%]  `}
        positionTransition
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        // dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
        // onDragEnd={closeOnDrag}
        variants={notificationVariants} // Defined animation states
        whileHover="hover" // Animation on hover gesture
        initial="initial" // Starting animation
        animate="animate" // Values to animate to
        exit="exit" // Target to animate to when removed from the tree
      >
        <div
          className={`${styleToast.bg} flex flex-row justify-between py-2 px-3 gap-2 `}
        >
          <MuiIcon
            className={styleToast.icon.color}
            iconName={styleToast.icon.name}
            fontSize={24}
          />
          <h3 className={`font-roboto-medium capitalize w-full bg-red-300`}>
            {styleToast.span}
          </h3>
        </div>
      </motion.div>
      {/* <Transition
              appear
              show={true}
              className="transform p-4 flex bg-white rounded shadow-lg"
              enter="transition-all duration-150"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <p className="px-2">HONTONU</p>
            </Transition> */}
    </>
  );
};
