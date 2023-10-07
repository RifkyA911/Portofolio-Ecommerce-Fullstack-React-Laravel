import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
// Components
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { MuiIcon } from "../../utils/RenderIcons";

const URL_PUT = import.meta.env.VITE_API_URL_PUT_ADMIN;

export const ShowAdminName = (props) => {
  const { data, onProfilePictureClick } = props;

  // console.log(data.id);
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
        <div className="avatar " onClick={onProfilePictureClick}>
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
  // console.log(data.id);

  const [thisAdmin, setThisAdmin] = useState({
    superAuthorizationPassword: null,
    adminsId: null,
    authority: {
      chat: false,
      sort_warehouse: false,
      alter_price: false,
    },
  });
  const [toggleTypes, setToggleTypes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const toggleTypes = ["chat", "sort_warehouse", "alter_price"];
  const toggleColors = ["toggle-info", "toggle-success", "toggle-warning"];

  const isComponentMounted = useRef(true);

  useEffect(() => {
    // Hanya jalankan jika komponen sudah dimuat
    if (data.authority) {
      if (!isComponentMounted.current) {
        // console.log(Object.keys(thisAdmin.authority));
        setToggleTypes(Object.keys(thisAdmin.authority));
        const parsedAuthority = JSON.parse(data.authority);
        setThisAdmin((prevAdmin) => ({
          ...prevAdmin,
          superAuthorizationPassword: "superAdmin",
          adminsId: data.id,
          authority: {
            chat: parsedAuthority.chat,
            sort_warehouse: parsedAuthority.sort_warehouse,
            alter_price: parsedAuthority.alter_price,
          },
        }));
      }
    }
  }, [data]);

  const handleToggleChange = (toggleType) => {
    setThisAdmin((prevAdmin) => ({
      ...prevAdmin,
      authority: {
        ...prevAdmin.authority, // Tetapkan properti authority sebelumnya
        [toggleType]: !prevAdmin.authority[toggleType], // Perbarui properti sesuai dengan toggleType
      },
    }));
    setToggle(!toggle);
    setIsUpdated(true);
  };

  const updateAdminsAuthority = async (data) => {
    await axios
      .patch(URL_PUT, data)
      .then((data) => {
        console.info(data.data);
      })
      .catch((error) => {
        setToggle(!toggle);
        setErrorMessage(error.response.data.message);
        console.error(error);
      });
  };

  useEffect(() => {
    // Ketika komponen selesai dimuat, set ref ke false
    isComponentMounted.current = false;

    if (
      thisAdmin.superAuthorizationPassword &&
      thisAdmin.adminsId &&
      isUpdated // Hanya jalankan jika belum diupdate
    ) {
      console.info(data.username + " => " + data.authority);
      setToggle(!toggle);
      setIsUpdated(false); // Set state isUpdated ke true agar tidak dijalankan lagi
      updateAdminsAuthority(thisAdmin);
    }
  }, [thisAdmin]);

  return (
    <div className="w-full flex lg:flex-row justify-around items-center">
      <div className="bg-red-400 rounded-lg line-clamp-6 font-semibold text-red-900">
        {errorMessage}
      </div>
      {thisAdmin && (
        <>
          {toggleTypes.map((toggleType, index) => (
            <div key={toggleType}>
              <input
                // name="authority"
                type="checkbox"
                className={`toggle ${toggleColors[index]} m-2`}
                onChange={() => handleToggleChange(toggleType)}
                checked={thisAdmin?.authority?.[toggleType] || false}
              />
              <label htmlFor={toggleType}>
                {/* {console.info(thisAdmin.authority)} */}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export const ActionButton = (props) => {
  const { data, onClickDelete, onClickEdit } = props;

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
