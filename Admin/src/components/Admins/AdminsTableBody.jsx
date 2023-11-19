import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
// Components
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { MuiIcon, ReactIcons } from "../../utils/RenderIcons";
import { DangerAlert } from "../Alert";
import { MotionButton } from "../Button";
import { DateFormatter } from "../../utils/Formatter";
import { MyTableFilterContext } from "../Table/MyTableComponents";
import { SelectInput } from "../Form";
import { getAccessToken } from "../../Config/Session";
import RequestAPI from "../../Config/API";

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
          token: getAccessToken(),
        }));
      }
    }
  }, [data]);

  const updateAdminsAuthority = async (data) => {
    try {
      const request = await RequestAPI("admin/authority", "PATCH", data);
      // const response = request.data;
      // console.log(response);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setToggle(!toggle);
      setErrorMessage(error.response.data.message);
    }
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

export const AdminFilter = (props) => {
  const [date, setDate] = useState({
    start: "2000-01-01T01:00",
    end: DateFormatter("dateTimeLocale", null),
  });
  const [selectedAuthority, setSelectedAuthority] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);

  const { MenuBoxRef, labelRef } = useRef(null);

  const selectAuthorityFilter = [
    { id: 0, key: "chat", name: "Chat" },
    { id: 1, key: "sort_warehouse", name: "Sort Warehouse" },
    { id: 3, key: "alter_price", name: "Alter Price" },
  ];

  const selectRoleFilter = [
    { id: 0, name: "Super Admin" },
    { id: 1, name: "Admin" },
  ];

  const {
    clicked,
    setClicked,
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
    refresh,
    closeFunction,
    inputData,
    applyFilter,
    isDialogOpen,
    setTabPagination,
  } = useContext(MyTableFilterContext);

  const onSubmit = async (form) => {
    // console.info("data form:", form);
    if (!form) {
      alert("there is no form to send");
    }
    setValue("superAuthorizationPassword", SuperAdminKey);
    await applyFilter(form);
    closeFunction();
  };

  useEffect(() => {
    setValue("selectedAuthorities", selectedAuthority);
    setValue("selectedRoles", selectedRole);
    // console.log(getValues("selectedFilter"));
  }, [selectedRole, selectedAuthority]);

  const AuthorityBackgroundColor = (key) => {
    switch (key) {
      case "alter_price":
        return "bg-amber-500 hover:bg-yellow-500 text-white";
      case "chat":
        return "bg-sky-500 hover:bg-blue-500 text-white";
      case "sort_warehouse":
        return "bg-green-500 hover:bg-teal-500 text-white";
      default:
        return "bg-slate-200 hover:bg-slate-300 text-black";
    }
  };

  const RoleBackgroundColor = (id) => {
    switch (id) {
      case 0:
        return "bg-indigo-500 hover:bg-fuchsia-500 text-white";
      case 1:
        return "bg-cyan-500 hover:bg-violet-500 text-white";
      default:
        return "bg-slate-200 hover:bg-slate-300 text-black";
    }
  };

  return (
    <>
      {isDialogOpen.filter && (
        <div
          className="absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.1px]"
          onClick={() => {
            closeFunction();
            // setValue("superAuthorizationPassword", null);
          }}
        ></div>
      )}
      <div
        ref={MenuBoxRef}
        className={`${
          !isDialogOpen.filter ? "hidden" : "block"
        } absolute bg-white w-[300px] md:w-[600px] min-h-[300px] top-11 left-0 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium`}
      >
        <div className="relative pl-4 py-2 h-8 bg-slate-50 flex flex-row justify-between items-center">
          <div className="inline-flex items-center">
            <MuiIcon iconName={"FilterListRounded"} fontSize={20} />
            <h1 className="text-center mx-2 font-roboto-bold">Filter</h1>
          </div>
          <div className="inline-flex items-center">
            <button
              onClick={() => {
                setSelectedAuthority([]);
                setSelectedRole([]);
                setDate({
                  start: "2000-01-01T01:00",
                  end: DateFormatter("dateTimeLocale", null),
                });
                setValue("date_start", "2000-01-01T01:00");
                setValue("date_end", DateFormatter("dateTimeLocale", null));
                setClicked(false);
              }}
              className=" py-2 px-4 hover:bg-sky-200 text-left transition-all delay-50"
            >
              <ReactIcons iconName={"MdRefresh"} fontSize={20} />
            </button>
            <button
              onClick={() => {
                closeFunction();
                refresh();
              }}
              className=" py-2 px-4 hover:bg-red-200 text-left transition-all delay-50"
            >
              <MuiIcon iconName={"CloseRounded"} fontSize={20} />
            </button>
          </div>
        </div>
        <form
          autoComplete="off"
          className="flex flex-col px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="authority-filter flex flex-col gap-4 pb-2">
            <label className="pt-2 text-left inline-flex items-center gap-2 text-sm">
              <ReactIcons iconName="MdVpnKey" fontSize={16} /> Authority
            </label>
            {selectAuthorityFilter ? (
              <div className="inline-flex justify-start flex-wrap gap-2">
                {selectAuthorityFilter
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((select, index) => (
                    <MotionButton
                      key={select.key}
                      // className={`p-2 ${
                      //   selectedAuthority.some((key) => key === select.key)
                      //     ? "bg-amber-500 text-white"
                      //     : "bg-slate-200 "
                      // } rounded-lg hover:bg-amber-400 capitalize hover:text-white transition-all delay-100`}
                      className={`p-2 ${
                        selectedAuthority.includes(select.key)
                          ? AuthorityBackgroundColor(select.key)
                          : "bg-slate-200 hover:text-gray-600"
                      } rounded-lg capitalize  transition-all delay-100`}
                      type="button"
                      onClick={() => {
                        !selectedAuthority.some((key) => key === select.key)
                          ? setSelectedAuthority([
                              ...selectedAuthority,
                              select.key,
                            ]) // add new value
                          : setSelectedAuthority(
                              selectedAuthority.filter(
                                (item) => item !== select.key
                              ) // remove by value
                            );
                      }}
                    >
                      {select.name}
                    </MotionButton>
                  ))}
              </div>
            ) : (
              "skelton"
            )}
          </div>
          <div className="roles-filter flex flex-col gap-4 pb-2">
            <label className="pt-2 text-left inline-flex items-center gap-2 text-sm">
              <ReactIcons iconName="FaUserCircle" fontSize={16} /> Roles
            </label>
            {selectRoleFilter ? (
              <div className="inline-flex justify-start flex-wrap gap-2">
                {selectRoleFilter
                  .sort((a, b) => b.name.localeCompare(a.name))
                  .map((select, index) => (
                    <MotionButton
                      key={select.id}
                      className={`p-2 ${
                        selectedRole.some((id) => id === select.id)
                          ? RoleBackgroundColor(select.id)
                          : "bg-slate-200 hover:text-gray-600"
                      } rounded-lg hover:bg-green-600 capitalize transition-all delay-100`}
                      type="button"
                      onClick={() => {
                        !selectedRole.some((id) => id === select.id)
                          ? setSelectedRole([...selectedRole, select.id]) // add new value
                          : setSelectedRole(
                              selectedRole.filter((item) => item !== select.id) // remove by value
                            );
                      }}
                    >
                      {select.name}
                    </MotionButton>
                  ))}
              </div>
            ) : (
              "skelton"
            )}
          </div>
          <div className="date-filter flex flex-col gap-4 pt-2 pb-2">
            <div className="text-sm inline-flex justify-start items-center w-full gap-4">
              <label
                onClick={() => setFocus("selected_date")}
                className="text-left inline-flex items-center gap-2"
              >
                <ReactIcons iconName="newIoCalendarSharp" fontSize={16} />{" "}
                Rentang Waktu :
              </label>
              <select
                className="focus:outline-none cursor-pointer"
                {...register("date_type", {
                  required: "select date type",
                })}
                onChange={(e) => {
                  setValue("date_type", e.target.value);
                  // console.log("selected_date", ":", getValues("selected_date"));
                }}
              >
                <option value="created_at">Created Date</option>
                <option value="updated_at">Updated Date</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <SelectInput
                formContext={MyTableFilterContext}
                className={`w-full flex gap-4 flex-col `}
                label="Start"
                labelSize="text-xs"
                name="date_start"
                type="datetime-local"
                defaultValue={date.start}
              />
              <SelectInput
                formContext={MyTableFilterContext}
                className={`w-full flex gap-4 flex-col `}
                label="End"
                labelSize="text-xs"
                name="date_end"
                type="datetime-local"
                defaultValue={date.end}
              />
            </div>
          </div>
          <div className="py-2 mt-2 border-t flex flex-row justify-center">
            <MotionButton
              disabled={
                selectedAuthority.length > 0 || selectedRole.length > 0
                  ? false
                  : true
              }
              formType="confirm"
              onClick={() => {
                // setShowModal(false);
                setTabPagination(false);
                setClicked(true);
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};
