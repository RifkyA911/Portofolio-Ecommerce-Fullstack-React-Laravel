import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MuiIcon, ReactIcons } from "../utils/RenderIcons";
import { debounce } from "lodash";
import Tooltips from "./Tooltips";

export const ActionButton = (props) => {
  const {
    disabled = false,
    className,
    onClickVisibilty,
    onClickDetails,
    onClickPrint,
    onClickDelete,
    onClickCancel,
    onClickEdit,
    onClickApprove,
    fontSize = 22,
    iconName,
  } = props;

  const actionBtn = {
    visibility: {
      className:
        "text-gray-500 hover:text-white hover:from-green-500 hover:to-lime-500 outline-teal-400",
      iconName: "IoEye",
      onClick: onClickVisibilty,
    },
    details: {
      className:
        "text-gray-500 hover:text-white hover:from-cyan-500 hover:to-sky-500 outline-cyan-400",
      iconName: "BiMessageDetail",
      onClick: onClickDetails,
    },
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
    cancel: {
      className:
        "text-red-500 hover:text-white hover:from-red-600 hover:to-red-500 outline-red-400",
      iconName: "IoCloseSharp",
      onClick: onClickCancel,
    },
    edit: {
      className:
        "text-gray-500 hover:text-white hover:from-blue-500 hover:to-indigo-500 outline-blue-400",
      iconName: "BiSolidEditAlt",
      onClick: onClickEdit,
    },
    approve: {
      className:
        "text-lime-600 hover:text-white hover:from-lime-500 hover:to-green-500 outline-green-400",
      iconName: "IoMdCheckmark",
      onClick: onClickApprove,
    },
  };

  return (
    // <Tooltips text="SDSD">
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
    // </Tooltips>
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

  useEffect(() => {
    setFormButton(formType);

    const getDefaultStyle = (bg, text, icon, span) => ({
      Bg: !disabled ? bg : `${bg} hover:bg-red-100 border border-gray-300`,
      text: !disabled ? text : "text-gray-500",
      size: null,
      icon: icon,
      span: span,
    });

    const getStyle = (bg, icon, span) => ({
      Bg: !disabled
        ? bg
        : `${bg} hover:${bg.replace(/\d+/, (match) => +match + 100)}`,
      text: "text-white",
      size: null,
      icon: icon ?? styleButton.icon,
      span: span ?? styleButton.span,
    });

    const formStyles = {
      default: getDefaultStyle("bg-white", "text-black", icon, span),
      apply: getStyle(
        "bg-gradient-to-r from-green-500 to-lime-500",
        icon ?? "FiCheck",
        span ?? "Apply"
      ),
      reject: getStyle(
        "bg-gradient-to-r from-red-500 to-pink-500",
        icon ?? "IoClose",
        span ?? "Reject"
      ),
      insert: getStyle(
        "bg-sky-500",
        icon ?? "BiSolidAddToQueue",
        span ?? "Insert"
      ),
      alter: getStyle(
        "bg-indigo-500",
        icon ?? "RiEdit2Fill",
        span ?? "Save Changes"
      ),
      delete: getStyle(
        "bg-red-500",
        icon ?? "MdDeleteForever",
        span ?? "Delete"
      ),
      print: getStyle("bg-lime-500", icon ?? "PiPrinterFill", span ?? "Print"),
      confirm: getStyle("bg-lime-500", icon ?? "FiCheck", span ?? "Confirm"),
      cancel: {
        Bg: !disabled
          ? "bg-slate-50 hover:bg-amber-500 border"
          : "bg-slate-50 hover:bg-slate-200 border",
        text: !disabled
          ? "text-black hover:text-white hover:border-orange-300"
          : "text-gray-500 hover:text-gray-700 hover:border-orange-100",
        size: null,
        icon: icon ?? "CgClose",
        span: span ?? "Cancel",
      },
      defaultFallback: {
        Bg: null,
        text: null,
        size: null,
        icon: icon,
        span: span,
      },
    };

    setStyleButton(formStyles[formType] || formStyles.defaultFallback);
  }, [formType, onClick, disabled, styleButton.icon, styleButton.span]);

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

export const TabsMenu = (props) => {
  const {
    onClick,
    checked,
    tabs = ["Tab 1", "Tab 2", "Tab 3"],
    children,
  } = props;

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const id = useId();
  const renderTabs = () => {
    return Array.from({ length: tabs.length }, (_, index) => {
      const tabIndex = index + 1;
      const tabLabel = `Tab ${tabIndex}`;

      return (
        <>
          <input
            key={tabIndex}
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label={tabLabel}
            checked={checked === tabIndex}
            onChange={() => onClick(tabIndex)}
          />
          <motion.div
            role="tabpanel"
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            {children ?? `Tab content ${tabs[index]}`}
          </motion.div>
        </>
      );
    });
  };

  return (
    // <div role="tablist" className="tabs tabs-lifted">
    <AnimatePresence>
      <div role="tablist" className="tabs tabs-lifted">
        {renderTabs()}
      </div>
    </AnimatePresence>
    // </div>
  );
};
