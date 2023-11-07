import { Fragment, React } from "react";
import { Link } from "react-router-dom";
// Data
import { MarketInbox, MarketNotification } from "../Config/Temporary";
// UI
import { Transition, Popover, Switch, Tab } from "@headlessui/react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, darkTheme } from "../Redux/Slices/UISlice";
// UTILS
import { getUser, logOutUser } from "../utils/Session/Admin";
import { MuiIcon } from "../utils/RenderIcons";

export const NavbarComponent = () => {
  // REDUX
  const { BgColor, textColor, screenWidth, ComponentColor } = useSelector(
    (state) => state.UI
  );
  const { logged, adminsId, id, email, username, pict, role } = useSelector(
    (state) => state.user
  );

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
                    {MarketNotification.length}
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
                  <div className="bg-red-400 text-xl">
                    Nunggu Data Seeder dari DB
                  </div>
                  <div className="flex justify-between relative bg-slate-50 shadow-xl shadow-black w-full p-3">
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
                  <div className="relative bg-white p-4 grid grid-cols-1 text-left overflow-y-scroll max-h-80">
                    {" "}
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    {MarketNotification.slice(0, 5).map((item, bg) => (
                      <Link
                        key={item.id}
                        to={`/notification?${item.id}`}
                        className="border-b shadow-sm focus:ring-2 hover:ring-2 hover:ring-slate-300 p-2 flex items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          {item.status === "success" ? (
                            /* Konten untuk status "success" */
                            <MuiIcon
                              iconName="Insights"
                              className="text-lime-500"
                            />
                          ) : item.status === "danger" ? (
                            /* Konten untuk status "danger" */
                            <MuiIcon
                              iconName="DeleteForever"
                              className="text-red-500"
                            />
                          ) : item.status === "warning" ? (
                            /* Konten untuk status "warning" */
                            <MuiIcon
                              iconName="Announcement"
                              className="text-yellow-500"
                            />
                          ) : item.status === "info" ? (
                            /* Konten untuk status "info" */
                            <MuiIcon
                              iconName="Info"
                              className="text-blue-500"
                            />
                          ) : (
                            /* Konten default jika status tidak cocok dengan yang diharapkan */
                            <span>Unknown</span>
                          )}
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
                            {item.time}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link to="/notification" className="text-center p-3">
                      <div className="font-semibold bg-slate-200 rounded-2xl p-2">
                        <span className="pr-3">Check more Notification</span>
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
                  <img
                    src={`./src/assets/admin_avatar/${userSession.pict}`}
                    alt="profile"
                    className="w-6 h-6 rounded-full text-center "
                  />
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
              <Popover.Panel className="-translate-x-[75%]  lg:-translate-x-[85%] transform px-4 sm:px-0 lg:max-w-3xl z-10 mt-2 absolute w-60">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="lg:p-4 py-2 px-2 flex flex-col w-full bg-slate-100 shadow-sm">
                    <div className="flex flex-row picture items-center px-4">
                      <div className="flex relative pr-4">
                        <img
                          src={`./src/assets/admin_avatar/${pict}`}
                          alt="profile"
                          className="w-14 h-14 rounded-full text-center"
                        />
                      </div>
                      <div className="flex flex-col text-left ">
                        <p className="flex-none font-medium text-sm text-ellipsis overflow-hidden max-h-[85px] max-w-[85px] line-clamp-2">
                          {username}
                        </p>
                        <p className="text-xs">
                          {role == 0 ? "Super Admin" : "Admin"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative bg-white py-2 grid grid-cols-1 text-left overflow-y-scroll max-h-80">
                    <div className="flex flex-1 items-center py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div className="flex toggle-theme mb-1">
                        {BgColor != "bg-white" ? (
                          <MuiIcon
                            iconName="NightsStayTwoTone"
                            className="text-sky-800 mr-3 transition-transform fade duration-300"
                          />
                        ) : (
                          <MuiIcon
                            iconName="Brightness4TwoTone"
                            className="text-yellow-500 mr-3 transition-transform duration-300"
                          />
                        )}
                        <input
                          type="checkbox"
                          className="toggle  checked:text-white"
                          onClick={() => {
                            dispatch(darkTheme());
                          }}
                        />
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="flex flex-row justify-center items-center p-0 text-yellow-500 ">
                          <i className="text-2xl">
                            {/* {<IconsIo iconName="IoMdPartlySunny" />} */}
                          </i>
                          <span className="text-black font-roboto-medium text-md">
                            36°
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/myprofile"
                      className="flex flex-1 items-center py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <MuiIcon
                        iconName="ManageAccounts"
                        className="text-dark mr-4"
                      />
                      <p>My Profile</p>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex flex-1 items-center py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <MuiIcon iconName="Settings" className="text-dark mr-4" />
                      <p>Settings</p>
                    </Link>
                    <a
                      href="/login"
                      onClick={logOutUser}
                      className=" border-t-2 border-slate-200 flex flex-1 items-center mt-2 py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <MuiIcon
                        iconName="LogoutOutlined"
                        className="text-dark mr-4"
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
