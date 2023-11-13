import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
// Components
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { MuiIcon } from "../../utils/RenderIcons";
import { DangerAlert } from "../Alert";

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerPublicAdminsImg = import.meta.env.VITE_SERVER_PUBLIC_ADMIN;
const URL_BY_ID = import.meta.env.VITE_API_ID_ADMIN + "/authority";

export const ShowAdminData = (props) => {
  const { data, onClick } = props;

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
        <div className="avatar " onClick={onClick}>
          <div className="mask mask-squircle w-16 h-16 cursor-pointer ">
            <img src={`${ServerPublicAdminsImg}${data.pict}`} />
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
  // console.log("AuthorityToggle", data);

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
    if (data.authority) {
      if (!isComponentMounted.current) {
        setToggleTypes(Object.keys(thisAdmin.authority)); // hitung jumlah key value
        const parsedAuthority = JSON.parse(data.authority);
        setThisAdmin((prevAdmin) => ({
          ...prevAdmin,
          superAuthorizationPassword: SuperAdminKey,
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

  const updateAdminsAuthority = async (data) => {
    await axios
      .patch(URL_BY_ID, data)
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
      {errorMessage && <DangerAlert message={errorMessage} />}
      {thisAdmin && (
        <>
          {toggleTypes.map((toggleType, index) => (
            <div key={toggleType}>
              <input
                // name="authority"
                type="checkbox"
                className={`toggle ${toggleColors[index]} m-2`}
                onChange={() => {
                  setThisAdmin((prevAdmin) => ({
                    ...prevAdmin,
                    authority: {
                      ...prevAdmin.authority, // Tetapkan properti authority sebelumnya
                      [toggleType]: !prevAdmin.authority[toggleType], // Perbarui properti sesuai dengan toggleType
                    },
                  }));
                  setToggle(!toggle);
                  setIsUpdated(true);
                }}
                checked={thisAdmin?.authority?.[toggleType] || false}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
