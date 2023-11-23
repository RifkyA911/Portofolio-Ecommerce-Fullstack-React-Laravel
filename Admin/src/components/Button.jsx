import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { MuiIcon, ReactIcons } from "../utils/RenderIcons";
import { debounce } from "lodash";

export const ActionButton = (props) => {
  const {
    disabled = false,
    className,
    onClickView,
    onClickPrint,
    onClickDelete,
    onClickEdit,
    fontSize = 22,
    iconName,
  } = props;

  const actionBtn = {
    print: {
      className:
        "text-gray-500 hover:text-white hover:from-amber-500 hover:to-yellow-500 outline-amber-400",
      iconName: "MdLocalPrintshop",
      onClick: onClickPrint,
    },
    delete: {
      className:
        "text-gray-500 hover:text-white hover:from-red-600 hover:to-red-500 outline-red-400",
      iconName: "MdDeleteForever",
      onClick: onClickDelete,
    },
    edit: {
      className:
        "text-gray-500 hover:text-white hover:from-blue-500 hover:to-indigo-500 outline-blue-400",
      iconName: "BiSolidEditAlt",
      onClick: onClickEdit,
    },
    visibility: {
      className:
        "text-gray-500 hover:text-white hover:from-green-500 hover:to-lime-500 outline-teal-400",
      iconName: "IoEye",
      onClick: onClickView,
    },
  };

  return (
    <div className="w-full gap-4 xflex-wrap flex lg:flex-row justify-around items-center">
      {Object.keys(actionBtn).map(
        (key) =>
          actionBtn[key].onClick && (
            <MotionButton
              key={key}
              disabled={disabled}
              className={
                className ??
                `p-2 rounded-md hover:bg-gradient-to-r hover:outline-none outline outline-2 transition-all duration-200 ${actionBtn[key].className}`
              }
              type="button"
              onClick={actionBtn[key].onClick}
            >
              <ReactIcons
                iconName={iconName ?? actionBtn[key].iconName}
                fontSize={fontSize}
              />
            </MotionButton>
          )
      )}
    </div>
  );
};

export const MotionButton = (props) => {
  const {
    disabled,
    className,
    formType,
    icon,
    iconSize = 20,
    span,
    style,
    noSpan = false,
    type = "submit",
    size,
    onClick,
    children,
  } = props;

  const [formButton, setFormButton] = useState(formType ?? null);
  const [styleButton, setStyleButton] = useState({
    Bg: null,
    text: null,
    size: null,
    icon: null,
    span: null,
  });
  // Konten komponen

  useEffect(() => {
    setFormButton(formType);
    if (formType == "default") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-white hover:bg-slate-50 border border-gray-300`
          : `bg-white hover:bg-red-100 border border-gray-300`,
        text: !disabled ? `text-black` : `text-gray-500`,
        size: null,
        icon: icon,
        span: span,
      });
    } else if (formType == "apply") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-teal-500 hover:bg-teal-600`
          : `bg-teal-300 hover:bg-teal-400`,
        text: `text-white`,
        size: null,
        icon: icon ?? `DeleteForeverSharp`,
        span: span ?? `Apply`,
      });
    } else if (formType == "insert") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-sky-500 hover:bg-sky-600`
          : `bg-sky-300 hover:bg-sky-400`,
        text: `text-white`,
        size: null,
        icon: icon ?? `BiSolidAddToQueue`,
        span: span ?? `Insert`,
      });
    } else if (formType == "alter") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-indigo-500 hover:bg-violet-600`
          : `bg-indigo-300 hover:bg-violet-400`,
        text: `text-white`,
        size: null,
        icon: icon ?? `RiEdit2Fill`,
        span: span ?? `Save Changes`,
      });
    } else if (formType == "delete") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-red-500 hover:bg-red-600`
          : `bg-red-300 hover:bg-red-400`,
        text: `text-white`,
        size: null,
        icon: icon ?? `MdDeleteForever`,
        span: span ?? `Delete`,
      });
    } else if (formType == "print") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-lime-500 hover:bg-lime-600`
          : `bg-lime-300 hover:bg-lime-400`,
        text: `text-white`,
        size: null,
        icon: icon ?? `PiPrinterFill`,
        span: span ?? `Print`,
      });
    } else if (formType == "confirm") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-lime-500 hover:bg-lime-600`
          : `bg-lime-300 hover:bg-lime-400`,
        text: `text-white`,
        size: null,
        icon: icon ?? `FiCheck`,
        span: span ?? `Confirm`,
      });
    } else if (formType == "cancel") {
      setStyleButton({
        ...styleButton,
        Bg: !disabled
          ? `bg-slate-50 hover:bg-amber-500 border border-gray-300`
          : `bg-slate-50 hover:bg-amber-400`,
        text: !disabled
          ? `text-black hover:text-white hover:border-orange-300`
          : `text-gray-500 hover:text-gray-700 hover:border-orange-100`,
        size: null,
        icon: icon ?? `CgClose`,
        span: span ?? `Cancel`,
      });
    } else {
      setStyleButton({
        ...styleButton,
        Bg: null,
        text: null,
        size: null,
        icon: icon,
        span: span,
      });
    }
  }, [formType, onClick, disabled]);

  return (
    <>
      {/* {formType && ( */}
      <motion.button
        disabled={disabled}
        type={type}
        tabIndex={0}
        className={
          className ??
          `${styleButton.Bg} ${styleButton.text} ${styleButton.size} w-full outline-none flex flex-row justify-center items-center rounded-md shadow-sm px-4 py-3 text-base font-medium focus:outline-none sm:ml-3 sm:w-auto sm:text-sm `
        }
        onClick={onClick}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {children ? (
          children
        ) : (
          <>
            <span
              className={`${style} flex flex-row items-center justify-between px-1`}
            >
              <ReactIcons iconName={styleButton.icon} fontSize={iconSize} />
              {!noSpan && <span className="px-1">{styleButton.span}</span>}
            </span>
          </>
        )}
      </motion.button>
      {/* )} */}
    </>
  );
};

export const ListMenu = (props) => {
  const { className, backdrop = false, onClick, text } = props;
  return (
    <>
      {backdrop && (
        <div
          className="absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.91px]"
          onClick={onClick}
        ></div>
      )}
      <button className={className} onClick={onClick}>
        {text}
      </button>
    </>
  );
};
