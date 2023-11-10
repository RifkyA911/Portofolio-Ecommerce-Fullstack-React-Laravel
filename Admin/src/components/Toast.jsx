import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ReactIcons } from "../utils/RenderIcons";
import { debounce } from "lodash";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

export const MainToastHandler = (props) => {
  const {
    className,
    bg,
    color,
    formType,
    icon,
    span,
    type,
    size,
    onClick,
    children,
  } = props;
  return (
    <>
      <div>s</div>
    </>
  );
};

export const FormToast = (props) => {
  const {
    setResultStatus,
    className,
    bg,
    color,
    formType,
    icon,
    span,
    type,
    size,
    onClick,
    children,
  } = props;

  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [styleToast, setStyleToast] = useState({
    bg: null,
    text: null,
    icon: {
      name: null,
      color: null,
    },
    span: null,
  });

  // REDUX
  const {
    BgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setStyleToast({
      ...styleToast,
      bg: bg ?? `${BgColor} border-gray-300`,
      text: color ?? textColor,
      icon:
        formType === "default"
          ? { name: icon ?? "BiSolidCheckCircle", color: "text-green-600" }
          : formType === "success"
          ? { name: icon ?? "BiSolidCheckCircle", color: "text-green-600" }
          : formType === "error"
          ? { name: icon ?? "BiSolidError", color: "text-red-500" }
          : formType === "warning"
          ? { name: icon ?? "IoWarningOutline", color: "text-amber-600" }
          : formType === "info"
          ? { name: icon ?? "MdInfo", color: "text-blue-600" }
          : formType === "session"
          ? { name: icon ?? "AiOutlineFieldTime", color: "text-lime-600" }
          : formType === "fixed"
          ? { name: icon ?? "AiFillTool", color: "text-orange-600" }
          : formType === "insert"
          ? { name: icon ?? "BiSolidCheckCircle", color: "text-sky-600" }
          : formType === "alter"
          ? { name: icon ?? "BiSolidCheckCircle", color: "text-indigo-600" }
          : formType === "drop"
          ? { name: icon ?? "BiSolidCheckCircle", color: "text-red-600" }
          : {
              name: "BsQuestionCircleFill",
              color: "text-teal-600",
            },
      span: span ?? "Default Toast",
    });
  }, [formType, onClick, BgColor, span]);

  return (
    <>
      <motion.div
        className={`fixed left-5 bottom-5 z-[99999] cursor-pointer p-0 min-w-[15.0%]  `}
        positionTransition
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
        // onDragEnd={closeOnDrag}
        variants={{
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
            y: 50, // Atur perubahan posisi y di sini untuk menghilang ke bawah
            transition: { ease: "easeOut", duration: 0.15 },
          },
          hover: { scale: 1.05, transition: { duration: 0.1 } },
        }}
        whileHover="hover"
        initial="initial"
        exit="exit"
        animate={isVisible ? "animate" : "exit"}
      >
        <div
          className={`${styleToast.bg} flex flex-row justify-between py-2 px-3 gap-2 rounded-md shadow-lg border`}
        >
          {/* <MuiIcon
            className={styleToast.icon.color}
            iconName={styleToast.icon.name ?? "CheckCircleRounded"}
            // iconName="CheckCircleRounded"
            fontSize={24}
          /> */}
          <ReactIcons
            className={styleToast.icon.color}
            iconName={styleToast.icon.name ?? "FiGithub"}
            fontSize={24}
          />
          <h3 className={`font-roboto-medium capitalize w-full`}>
            {styleToast.span}
          </h3>
        </div>
      </motion.div>
    </>
  );
};
