import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MuiIcon, ReactIcons } from "../utils/RenderIcons";
import { debounce } from "lodash";
import Tooltips from "./Tooltips";
import { useSelector } from "react-redux";

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
      // ACTION
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
      // CRUD
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
      // UTILITY
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
      // ORDERS
      Pending: getStyle(
        "bg-gradient-to-r from-green-500 to-green-400",
        icon ?? "IoCartSharp",
        span ?? "???"
      ),
      "Awaiting Payment": getStyle(
        "bg-gradient-to-r from-orange-400 to-orange-500",
        icon ?? "MdOutlinePayment",
        span ?? "???"
      ),
      Processing: getStyle(
        "bg-gradient-to-r from-cyan-500 to-cyan-500",
        icon ?? "MdOutlinePendingActions",
        span ?? "???"
      ),
      Shipped: getStyle(
        "bg-gradient-to-r from-blue-500 to-cyan-500",
        icon ?? "FaTruck",
        span ?? "???"
      ),
      Delivered: getStyle(
        "bg-gradient-to-r from-green-500 to-lime-500",
        icon ?? "MdCloudDone",
        span ?? "???"
      ),
      Completed: getStyle(
        "bg-gradient-to-r from-gray-500 to-gray-400",
        icon ?? "IoCheckmarkCircle",
        span ?? "???"
      ),
      Cancelled: getStyle(
        "bg-gradient-to-r from-red-500 to-red-600",
        icon ?? "MdCancel",
        span ?? "???"
      ),
      "On Hold": getStyle(
        "bg-gradient-to-r from-green-500 to-lime-500",
        icon ?? "FaHandPaper",
        span ?? "???"
      ),
      Returned: getStyle(
        "bg-gradient-to-r from-pink-500 to-pink-500",
        icon ?? "MdAssignmentReturn",
        span ?? "???"
      ),
      "Partially Shipped": getStyle(
        "bg-gradient-to-r from-green-500 to-lime-500",
        icon ?? "AiOutlineApartment",
        span ?? "???"
      ),
      Backordered: getStyle(
        "bg-gradient-to-r from-green-500 to-lime-500",
        icon ?? "TbTruckReturn",
        span ?? "???"
      ),
      Failed: getStyle(
        "bg-gradient-to-r from-green-500 to-lime-500",
        icon ?? "MdSmsFailed",
        span ?? "???"
      ),

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
        disabled={disabled ?? formType == "OnCompleted" ? true : false}
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

export const DaisyUITabsMenu = (props) => {
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
      const tabLabel = `${tabs[index]}`;

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
            className="tab-content bg-base-100 border-base-300 rounded-box p-6  "
          >
            <div className="min-h-[400px] bg-slate-50">
              {children ?? `Tab content ${tabs[index]}`}
            </div>
          </motion.div>
        </>
      );
    });
  };

  return (
    // <div role="tablist" className="tabs tabs-lifted">
    <AnimatePresence>
      <div role="tablist" className="tabs tabs-lifted ">
        {renderTabs()}
      </div>
    </AnimatePresence>
    // </div>
  );
};

export const MotionTabs = (props) => {
  const {
    tabs = [
      { name: "tab1", label: "Tab 1", render: () => <p>Content for Tab 1</p> },
      { name: "tab2", label: "Tab 2", render: () => <p>Content for Tab 2</p> },
      { name: "tab3", label: "Tab 3", render: () => <p>Content for Tab 3</p> },
    ],
    onClick,
    checked,
    children,
  } = props;

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // REDUX UI
  const {
    DarkMode,
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

  const handleClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const isSelected = (tab) => activeTab.name === tab.name;

  return (
    <div
      className={`w-full min-h-full ${
        DarkMode ? "bg-gray-700" : "bg-gray-50"
      } rounded-xl overflow-hidden flex flex-col`}
    >
      <div className="flex gap-4 px-2 border-b">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`relative ${
              isSelected(tab) ? "text-blue-500" : `${textColor}`
            }`}
          >
            <a
              href="#"
              className="block px-4 py-2 font-roboto-regular"
              onClick={(e) => handleClick(e, tab)}
            >
              {tab.label}
            </a>

            {isSelected(tab) && (
              <motion.div
                layoutId="indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
              />
            )}
          </div>
        ))}
      </div>

      <div
        className={`flex flex-col p-4 ${BgColor} ${textColor} overflow-auto h-full`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.name || "empty"}
            variants={{
              initial: {
                y: 10,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
              },
              exit: {
                y: -10,
                opacity: 0,
              },
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.3,
            }}
          >
            {activeTab && activeTab?.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
