import { useEffect, useState } from "react";
// Components
import { useSelector } from "react-redux";
import { MuiIcon } from "../../utils/RenderIcons";

export const GrantFeatures = (authorityString, adminId, isChecked) => {
  return (
    <>
      <div></div>
    </>
  );
};

// Function to parse the authority string and return true/false for chat
export function isChatEnabled(authorityString) {
  const authorityObj = JSON.parse(authorityString);
  return authorityObj.chat === "true";
}

// Function to handle checkbox changes and update state
export function handleCheckboxChange(data, isChecked) {
  // Membuat salinan data yang akan diubah
  const keys = Object.keys(data);
  console.table(keys);
  const newData = [...data];

  // // Mencari indeks data dengan id yang sesuai
  // const dataIndex = newData.findIndex((item) => item.id === key);

  // // Jika indeks ditemukan, kita update authority-nya
  // if (dataIndex !== -1) {
  //   const newAuthority = JSON.parse(newData[dataIndex].authority);
  //   newAuthority.chat = isChecked ? "true" : "false";
  //   newData[dataIndex].authority = JSON.stringify(newAuthority);
  // }

  // // Mengembalikan data yang sudah diubah
  // return newData;
}

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
  return (
    <>
      <div className="w-full flex lg:flex-row justify-around items-center">
        <input
          type="checkbox"
          className="toggle toggle-info m-2"
          onChange={(e) => handleCheckboxChange(data, e.target.checked)}
          checked={isChatEnabled(data.authority)}
        />
        <input
          type="checkbox"
          className="toggle toggle-success m-2"
          value={JSON.parse(data.authority).sort_warehouse ? true : false}
        />

        <input
          type="checkbox"
          className="toggle toggle-warning m-2"
          value={JSON.parse(data.authority).alter_price ? true : false}
        />
      </div>
    </>
  );
};

export const ActionButton = (props) => {
  const { data } = props;
  return (
    <>
      <div className="w-full flex lg:flex-row justify-around items-center">
        <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200">
          <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
        </button>
        <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-sky-600 hover:to-indigo-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200">
          <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
        </button>
      </div>
    </>
  );
};
