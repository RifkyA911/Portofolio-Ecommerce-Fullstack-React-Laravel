import React from "react";
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

  const { className, confirmType, type, onClick, children } = props;
  return (
    <>
      <div
        className={`sticky bottom-0 z-10 py-2 shadow-inner shadow-slate-50 bg-slate-100`}
      >
        {confirmType === "confirm" && (
          <button
            onClick={onClick}
            type={type}
            className="btn bg-gradient-to-tr hover:from-green-500 hover:to-teal-500 transition-all duration-500 from-green-500 to-lime-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <MuiIcon iconName="CheckRounded" /> Confirm
            {children}
          </button>
        )}
        {confirmType === "add" && (
          <button
            type="submit"
            className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <MuiIcon iconName="AddBoxRounded" /> Add New Data
            {children}
          </button>
        )}
        {confirmType === "alter" && (
          <button
            type="submit"
            className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-violet-500 transition-all duration-500 from-blue-500 to-violet-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <MuiIcon iconName="EditRounded" /> Save Changes
          </button>
        )}
        {confirmType === "drop" && (
          <button
            type="submit"
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

export const MyButton = (props) => {
  const { className, color, outline } = props;
  // Konten komponen
  return (
    <>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
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
