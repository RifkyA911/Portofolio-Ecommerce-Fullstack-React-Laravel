import React from "react";
import { MuiIcon } from "../utils/RenderIcons";

export const ActionButton = (props) => {
  const { onClickDelete, onClickEdit } = props;

  return (
    <>
      <div className="w-full flex lg:flex-row justify-around items-center">
        <button
          onClick={onClickDelete}
          className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200"
        >
          <MuiIcon iconName={"DeleteForeverOutlined"} fontSize={26} />
        </button>
        <button
          onClick={onClickEdit}
          className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200"
        >
          <MuiIcon iconName={"AutoFixHighOutlined"} fontSize={26} />
        </button>
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
