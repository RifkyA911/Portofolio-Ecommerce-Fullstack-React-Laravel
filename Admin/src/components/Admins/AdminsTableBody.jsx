import React, { useEffect, useRef, useState } from "react";
// Components
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { MuiIcon } from "../../utils/RenderIcons";

export const ShowAdminName = (props) => {
  const { data } = props;
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
  return (
    <>
      <div className="flex items-center space-x-3">
        <div
          className="avatar "
          onClick={() => document.getElementById("ShowPict").showModal()}
        >
          <div className="mask mask-squircle w-16 h-16 cursor-pointer ">
            <img
              src={`./src/assets/admin_avatar/${data.pict}`}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div className={`${textTable} pl-4 text-left`}>
          <div className="font-bold line-clamp-2 font-roboto-regular">
            {data.username}
          </div>
          <div className="mt-2 font-medium text-slate-500">{data.email}</div>
        </div>
      </div>
    </>
  );
};

export const ShowRole = (props) => {
  const { data } = props;
  return (
    <>
      <p className="font-semibold font-roboto-regular text-slate-800">
        {data.role == 0 ? "Super Admin" : "Admin"}
      </p>
    </>
  );
};

export const AuthorityToggle = (props) => {
  const { data } = props;
  const [authority, setAuthority] = useState({});

  useEffect(() => {
    const parsedAuthority = JSON.parse(data);
    setAuthority({
      chat: parsedAuthority.chat === "true",
      sort_warehouse: parsedAuthority.sort_warehouse === "true",
      alter_price: parsedAuthority.alter_price === "true",
    });
  }, [data]);

  const handleToggleChange = (toggleType) => {
    setAuthority((prevAuthority) => ({
      ...prevAuthority,
      [toggleType]: !prevAuthority[toggleType],
    }));
  };

  const toggleTypes = ["chat", "sort_warehouse", "alter_price"];
  const toggleColors = ["info", "success", "warning"];

  return (
    <div className="w-full flex lg:flex-row justify-around items-center">
      {toggleTypes.map((toggleType, index) => (
        <div key={toggleType}>
          <input
            type="checkbox"
            className={`toggle toggle-${toggleColors[index]} m-2`}
            onChange={() => handleToggleChange(toggleType)}
            // checked={authority[toggleType]}
            checked
          />
          {/* <label>{toggleType}</label> */}
        </div>
      ))}
    </div>
  );
};

export const ActionButton = (props) => {
  const { data, onClickDelete, onClickEdit } = props;

  // console.table(data.id);
  // console.log(errors.data);
  let content = null;

  // Misalnya, Anda ingin menampilkan username hanya jika id adalah 1
  if (data.id === 3) {
    content = <p>{data.username}</p>;
  }

  return (
    <>
      {content}
      {/* {(data.id = 8 && <p>{data.username}</p>)} */}
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
