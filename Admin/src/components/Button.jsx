import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { MuiIcon } from "../utils/RenderIcons";
import { debounce } from "lodash";

export const ActionButton = (props) => {
  const { onClickView, onClickPrint, onClickDelete, onClickEdit } = props;

  return (
    <>
      <div className="w-full gap-4 xflex-wrap flex lg:flex-row justify-around items-center">
        {/* {
          <button
            onClick={onClickView}
            className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-lime-600 hover:to-lime-500 hover:outline-none outline outline-2 outline-amber-400 transition-all duration-200"
          >
            <MuiIcon iconName={"RemoveRedEyeRounded"} fontSize={26} />
          </button>
        )} */}
        {onClickPrint && (
          <button
            onClick={onClickPrint}
            className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:outline-none outline outline-2 outline-amber-400 transition-all duration-200"
          >
            <MuiIcon iconName={"LocalPrintshopRounded"} fontSize={26} />
          </button>
        )}
        {onClickDelete && (
          <button
            onClick={onClickDelete}
            className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200"
          >
            <MuiIcon iconName={"DeleteForeverOutlined"} fontSize={26} />
          </button>
        )}
        {onClickEdit && (
          <button
            onClick={onClickEdit}
            className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200"
          >
            <MuiIcon iconName={"AutoFixHighOutlined"} fontSize={26} />
          </button>
        )}
      </div>
    </>
  );
};

export const ConfirmButton = (props) => {
  // const debouncedOnChange = debounce(setSearchTerm, 1000);

  const {
    stickyContainer = false,
    className,
    confirmType,
    type = "submit",
    onClick = null,
    children,
  } = props;
  return (
    <>
      <div
        className={`${
          stickyContainer &&
          "sticky bottom-0 z-10 py-2 shadow-inner shadow-slate-50 bg-slate-100"
        }`}
      >
        {confirmType === "confirm" && (
          <button
            onClick={onClick}
            type={type}
            className={`${className} btn px-6 my-4 bg-gradient-to-tr hover:from-green-500 hover:to-teal-500 transition-all duration-500 from-green-500 to-lime-500 rounded-lg text-white font-roboto-bold font-bold`}
          >
            <MuiIcon iconName="CheckRounded" /> Confirm
            {children}
          </button>
        )}
        {confirmType === "add" && (
          <button
            onClick={onClick}
            type={type}
            className={`${className} btn px-6 bg-gradient-to-tl hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 rounded-lg text-white font-roboto-bold font-bold`}
          >
            <MuiIcon iconName="AddBoxRounde" /> Add New Data
            {children}
          </button>
        )}
        {confirmType === "alter" && (
          <button
            onClick={onClick}
            type={type}
            className={`${className} btn px-6 bg-gradient-to-tl hover:from-indigo-500 hover:to-violet-500 transition-all duration-500 bg-size-100 bg-pos-0 hover:bg-pos-100 from-blue-500 to-violet-500 rounded-lg text-white font-roboto-bold font-bold`}
          >
            <MuiIcon iconName="EditRounded" /> Save Changes
          </button>
        )}
        {confirmType === "drop" && (
          <button
            onClick={onClick}
            type={type}
            // onClick={handleSubmit(onSubmit)}
            className="btn transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-red-400 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <span id="showDelete" className="options px-[4px]">
              <i className="font-xs">
                <MuiIcon iconName={"DeleteForeverSharp"} fontSize={20} />
              </i>
            </span>
            <span className="font-bold pr-2">Delete</span>
          </button>
        )}
        {confirmType === "cancel" && (
          <button
            type="button"
            // onClick={refresh}
            onClick={onClick}
            className="btn transition-all duration-500 bg-gradient-to-tl from-amber-500 via-orange-500 to-amber-400 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <span className="options px-[4px]">
              <i className="font-xs ">
                <MuiIcon iconName={"ClearTwoTone"} fontSize={20} />
              </i>
              <span className="font-bold pr-2">Cancel</span>
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export const MotionButton = (props) => {
  const {
    className,
    formType = "default",
    icon = "HelpRounded",
    span = "???",
    type = "button",
    onClick,
    children,
  } = props;

  const [formButton, setFormButton] = useState(formType ?? null);
  const [styleButton, setStyleButton] = useState({
    className: null,
    icon: null,
    span: null,
  });
  // Konten komponen

  useEffect(() => {
    setFormButton(formType);
    if (formType == "default") {
      setStyleButton({
        ...styleButton,
        className: `${className} mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`,
        icon: icon,
        span: span,
      });
    } else if (formType == "confirm") {
      setStyleButton({
        ...styleButton,
        className: `${className} w-full outline-none inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`,
        icon: "DeleteForeverSharp",
        span: "Delete",
      });
    } else if (formType == "delete") {
      setStyleButton({
        ...styleButton,
        className: `${className} w-full outline-none inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`,
        icon: "DeleteForeverSharp",
        span: "Delete",
      });
    } else if (formType == "cancel") {
      setStyleButton({
        ...styleButton,
        className: `${className} mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-slate-50 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`,
        icon: "DisabledByDefaultRounded",
        span: "Cancel",
      });
    }
  }, [formType]);

  return (
    <>
      {formType && (
        <motion.button
          type={type}
          tabIndex={0}
          className={styleButton.className}
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
              <span id="showDelete" className="options px-[4px]">
                <i className="font-xs">
                  <MuiIcon iconName={styleButton.icon} fontSize={20} />
                </i>
              </span>
              <span className=" pr-2">{styleButton.span}</span>
            </>
          )}
        </motion.button>
      )}
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
