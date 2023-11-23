import { Fragment, React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Data
import { MarketInbox } from "../Config/Temporary";
// UI
import { Transition, Popover, Switch, Tab } from "@headlessui/react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, darkTheme } from "../Redux/Slices/UISlice";
// UTILS
import { getAccessToken, getUser, logOutUser } from "../Config/Session";
import { MuiIcon, ReactIcons } from "../utils/RenderIcons";
import axios from "axios";
import { SkeltonCircle } from "./Skelton";
import { LoadingDaisyUI } from "./Loading";
import RequestAPI, { ServerPublic } from "../Config/API";
import { DateFormatter, SortData } from "../utils/Formatter";
import { notificationTypes, typeHandler } from "../Config/ObjectProps";

export const NavbarComponent = () => {
  const [admin, setAdmin] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // REDUX
  const {
    DarkMode,
    BgColor,
    ContainerBgColor,
    textColor,
    screenWidth,
    ComponentColor,
  } = useSelector((state) => state.UI);

  const table = "admin";
  const table2 = "notifications";
  const { id } = getUser();

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(
        url == "admin" ? url : `${url}/paginate/1/5`,
        "GET",
        { id }
      );
      // console.log(data.data);
      setLoading(false);
      if (url == "admin") {
        setAdmin(data.data);
      }
      if (url == "notifications") {
        const notificationsDate = SortData(data.data, "date");

        // console.log(Object.keys(notificationsDate));

        Object.keys(notificationsDate).forEach((date) => {
          const notificationsForDate = notificationsDate[date];
          // console.log(`Data for date ${date}:`, notificationsForDate);
        });

        // Jika Anda ingin menggabungkan semua data menjadi satu array, Anda dapat menggunakan flatMap
        const allNotifications = Object.values(notificationsDate).flatMap(
          (date) => date
        );
        // console.log("All notifications:", allNotifications);

        setNotifications(allNotifications);
      }
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(table);
    fetchData(table2);
  }, []);

  // useEffect(() => {
  //   console.log(SortData(notifications, "date"));
  // }, [notifications]);

  const dispatch = useDispatch();
  const userSession = getUser();

  const SmartphoneAutoHideSidebar = () => {
    if (screenWidth < 1024) {
      dispatch(toggleSidebar(false));
    }
  };

  // Konten komponen
  return (
    <>
      {/* Chat */}
      <Popover className="relative pl-2">
        {({ open }) => (
          <>
            <Popover.Button
              onClick={SmartphoneAutoHideSidebar}
              className={`
                ${open ? "" : "text-opacity-90"}
                rounded-md ${ComponentColor} font-extralight text-dark p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500 focus:ring-0 focus:outline-none`}
            >
              <div className="relative">
                <MuiIcon
                  iconName="Sms"
                  className="flex h-6 w-6 relative ring-0"
                />
                <span className="absolute left-4 bottom-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-white font-semibold justify-center">
                    {MarketInbox.length}
                  </span>
                </span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="-translate-x-[35%] lg:-translate-x-[90%] transform px-4 sm:px-0 lg:max-w-3xl z-10 mt-3 absolute w-96">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-red-400 text-xl">
                    Nunggu Data Seeder dari DB
                  </div>
                  <div className="flex justify-between relative bg-slate-50 shadow-xl shadow-black w-full p-3">
                    <span className="text-base font-medium">List Chat</span>
                    <Popover.Button className="hover:origin-center hover:scale-150 transition delay-100 font-bold">
                      <MuiIcon
                        iconName="Close"
                        sx={{ fontSize: 20 }}
                        className="text-red-600 font-sm mr-2 hover:text-violet-600"
                      />
                    </Popover.Button>
                    {/* </button> */}
                  </div>
                  <div className="relative bg-white p-4 grid grid-cols-1 text-left overflow-y-scroll max-h-80">
                    {MarketInbox.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        to={`/inbox?${item.id}`}
                        className="border-b shadow-sm focus:ring-2 hover:ring-2 hover:ring-slate-300 p-2 flex items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <img
                            src={`./src/assets/user_avatar/${item.img}`}
                            alt="user_avatar"
                            className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            {item.name}
                          </p>
                          <p className="w-64 overflow-hidden text-sm text-gray-500 truncate">
                            <MuiIcon
                              iconName="Circle"
                              fontSize={12}
                              className="text-red-600 font-sm mr-2"
                            />
                            {item.message}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link to="/inbox" className="text-center p-3">
                      <div className="font-semibold bg-slate-200 rounded-2xl p-2">
                        <span className="pr-3">Check more inbox</span>
                        <MuiIcon iconName="MoreHoriz" />
                      </div>
                    </Link>
                  </div>
                  <div className="bg-gray-50">
                    <Link
                      to="/"
                      className="flex flex-1 justify-center items-center p-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <MuiIcon
                        iconName="RecordVoiceOver"
                        className="text-dark mr-4"
                      />
                      Check Customer Complaints
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      {/* notification */}
      <Popover className="relative pl-2">
        {({ open }) => (
          <>
            <Popover.Button
              onClick={SmartphoneAutoHideSidebar}
              className={`
                ${open ? "" : "text-opacity-90"}
                rounded-md ${ComponentColor} font-extralight text-dark p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500 focus:ring-0 focus:outline-none`}
            >
              <div className="relative">
                <MuiIcon
                  iconName="NotificationsNone"
                  className="flex h-6 w-6 relative ring-0"
                />
                <span className="absolute left-4 bottom-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-white font-semibold justify-center">
                    {notifications.length}
                  </span>
                </span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="-translate-x-[48%]  lg:-translate-x-[90%] transform px-4 sm:px-0 lg:max-w-3xl z-10 mt-3 absolute w-96">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className={`flex justify-between relative ${
                      DarkMode ? "bg-slate-700" : "bg-slate-100"
                    } ${textColor} shadow-xl shadow-black w-full p-3`}
                  >
                    <span className="text-base font-medium">
                      List Notification
                    </span>
                    <Popover.Button className="hover:origin-center hover:scale-150 transition delay-100 font-bold">
                      <MuiIcon
                        iconName="Close"
                        fontSize={20}
                        className="text-red-600 font-sm mr-2 hover:text-violet-600"
                      />
                    </Popover.Button>
                    {/* </button> */}
                  </div>
                  <div
                    className={`relative flex flex-col gap-2 ${
                      DarkMode ? "bg-gray-800" : "bg-white"
                    } ${textColor} p-4 text-left overflow-y-scroll max-h-80`}
                  >
                    {notifications.map((item, bg) => (
                      <Link
                        key={item.id}
                        to={`/notification?${item.id}`}
                        className={`min-h-[60px] max-h-[60px] flex flex-row items-center rounded-lg border-b shadow-sm 
                        ${
                          DarkMode
                            ? "bg-slate-700 hover:bg-slate-600 text-gray-100 hover:ring-slate-600  focus-visible:ring-violet-500"
                            : "bg-slate-100 hover:bg-slate-50 text-gray-700 hover:ring-slate-300  focus-visible:ring-violet-500"
                        }
                         focus:ring-2 hover:ring-2 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-50`}
                      >
                        <ReactIcons
                          className={`${typeHandler(
                            item.type,
                            "iconColor"
                          )} mx-4`}
                          iconName={typeHandler(item.type, "iconName")}
                          fontSize={26}
                        />
                        <div
                          className={`w-[82.5%] pl-4 h-[56px] 
                          ${
                            DarkMode
                              ? "bg-slate-50 text-gray-100 "
                              : "bg-white text-gray-700 "
                          } 
                          flex flex-col justify-between py-2 rounded-lg`}
                        >
                          <p className="capitalize overflow-hidden truncate text-sm font-roboto text-gray-900 mb-2">
                            {item.message}
                          </p>
                          <p className="flex flex-row mr-2 justify-between overflow-hidden text-xs text-gray-500 truncate">
                            <span className="text-xs flex items-center">
                              <MuiIcon
                                iconName="Circle"
                                fontSize={12}
                                className="text-red-600 font-sm mr-2"
                              />
                              {item.type}
                            </span>
                            <small>
                              {DateFormatter("Day", item.updated_at)}
                            </small>
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link to="/notification" className="text-center p-2">
                      <div
                        className={`font-semibold ${
                          DarkMode ? "bg-slate-700" : "bg-slate-100"
                        } ${textColor} rounded-2xl p-2`}
                      >
                        <span className="pr-3">Check more Notification</span>
                        <MuiIcon iconName="MoreHoriz" />
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`${
                      DarkMode ? "bg-slate-700" : "bg-slate-100"
                    } ${textColor}`}
                  >
                    <Link
                      to="/"
                      className={`flex flex-1 justify-center items-center p-3 rounded-md transition duration-150 ease-in-out ${
                        DarkMode ? "hover:bg-slate-600" : "hover:bg-slate-200"
                      } ${textColor}`}
                    >
                      <MuiIcon
                        iconName="NotificationsActive"
                        className="text-dark mr-4"
                      />
                      View All
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      {/* profile */}
      <Popover className="relative pl-5 focus:ring-0 focus:outline-none">
        {({ open }) => (
          <>
            <Popover.Button
              onClick={SmartphoneAutoHideSidebar}
              className={`
                ${open ? "" : "text-opacity-90"}
                 font-extralight text-dark rounded-md duration-500 px-1 focus:ring-0 focus:outline-none`}
            >
              <div className="relative avatar  focus:ring-0 focus:outline-none">
                <div className="w-10 rounded-full shadow-xl focus:ring-0 focus:outline-none">
                  {!admin.pict ? (
                    <LoadingDaisyUI max={1} />
                  ) : (
                    <img
                      src={`${ServerPublic("admins")}${admin.pict}`}
                      alt="profile"
                      className="w-6 h-6 rounded-full text-center "
                    />
                  )}
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="-translate-x-[75%] lg:-translate-x-[80%] transform px-4 sm:px-0 lg:max-w-3xl z-10 mt-2 absolute w-60">
                <div className="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 shadow-sm shadow-sky-500/50">
                  <div
                    className={`lg:p-4 py-2 px-2 flex flex-col w-full ${
                      DarkMode ? "bg-slate-700 " + textColor : "bg-slate-100"
                    } shadow-sm `}
                  >
                    <div className="flex flex-row picture items-center px-2">
                      <div className="flex relative pr-4">
                        {!admin.pict ? (
                          <SkeltonCircle />
                        ) : (
                          <img
                            src={`${ServerPublic("admins")}${admin.pict}`}
                            alt="profile"
                            className="w-14 h-14 rounded-full text-center"
                          />
                        )}
                        <ReactIcons
                          className="absolute bottom-0 right-3 text-lime-500 "
                          iconName="GoDotFill"
                          fontSize={20}
                        />
                      </div>
                      <div className="flex-1 flex-col text-left ">
                        <p className="flex-none font-medium text-sm text-ellipsis overflow-hidden max-h-[85px] max-w-full line-clamp-2">
                          {admin.username}
                        </p>
                        <p className="text-xs">
                          {admin.role == 0 ? "Super Admin" : "Admin"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`relative bg-white  text-left overflow-y-auto max-h-80`}
                  >
                    <div className="flex flex-row items-center border-t border-b py-2 px-6 transition duration-150 ease-in-out hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div className="flex toggle-theme mb-1 py-1">
                        {BgColor != "bg-white" ? (
                          <ReactIcons
                            iconName="MdNightsStay"
                            className="text-sky-800 mr-3 transition-transform fade duration-300"
                            fontSize={24}
                          />
                        ) : (
                          <ReactIcons
                            iconName="MdSunny"
                            className="text-yellow-400 mr-3 transition-transform duration-300"
                            fontSize={24}
                          />
                        )}
                        <input
                          type="checkbox"
                          className="toggle text-amber-400 checked:text-sky-400"
                          onClick={() => {
                            dispatch(darkTheme());
                          }}
                        />
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="flex flex-row justify-center items-center p-0  ">
                          <i className="text-2xl">
                            <ReactIcons
                              iconName="IoPartlySunnySharp"
                              className="text-yellow-400 mr-3 transition-transform duration-300"
                              fontSize={22}
                            />
                          </i>
                          <span className="text-black font-roboto-medium text-md">
                            36°
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={` ${
                        DarkMode
                          ? "bg-slate-700 text-gray-100 border-slate-600"
                          : "bg-white text-gray-700 border-slate-300"
                      } flex flex-col pb-1 gap-1 justify-start items-start border-b transition duration-150 ease-in-out`}
                    >
                      <Link
                        to="/myprofile"
                        className={`${
                          DarkMode
                            ? "hover:bg-slate-600 text-gray-100"
                            : "hover:bg-slate-100 text-gray-700 "
                        } flex flex-row max-h-[40px] w-full items-center py-2 px-6 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-50`}
                      >
                        <ReactIcons
                          iconName="FaUserCog"
                          className="text-dark mr-4"
                          fontSize={18}
                        />
                        <p>My Profile</p>
                      </Link>
                      <Link
                        to="/settings"
                        className={`${
                          DarkMode
                            ? "hover:bg-slate-600 text-gray-100"
                            : "hover:bg-slate-100 text-gray-700 "
                        } flex flex-row max-h-[40px] w-full items-center py-2 px-6 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-opacity-50`}
                      >
                        <ReactIcons
                          iconName="FaGear"
                          className="text-dark mr-4"
                          fontSize={18}
                        />
                        <p>Settings</p>
                      </Link>
                    </div>
                    <a
                      href="/login"
                      onClick={logOutUser}
                      className={`${
                        DarkMode
                          ? "bg-gray-700 hover:bg-slate-600 text-gray-100"
                          : "bg-white hover:bg-slate-100 text-gray-700 "
                      } flex flex-row items-center py-2 px-6 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                    >
                      <ReactIcons
                        iconName="MdLogout"
                        className="text-dark mr-4"
                        fontSize={22}
                      />
                      Logout
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
