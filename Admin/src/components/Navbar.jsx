import { Fragment, useEffect, useRef, useState, React } from "react";
import { Link, Outlet } from "react-router-dom";
// Data
import { MarketInbox, MarketNotification } from "../Config/Temporary";
// UI
import { Menu, Transition, Popover, Switch, Tab } from "@headlessui/react";
import * as MuiIcons from "@mui/icons-material";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, darkTheme } from "../Redux/Slices/UISlice";

const Navbar = ({ showNav2 }) => {
  // REDUX
  const { BgColor, textColor, screenWidth, ComponentColor } = useSelector(
    (state) => state.UI
  );
  const { showNav } = useSelector((state) => state.navigation);
  const dispatch = useDispatch();

  const SmartphoneAutoHideSidebar = () => {
    if (screenWidth < 1024) {
      dispatch(toggleSidebar(false));
    }
  };

  return (
    <>
      {showNav ? (
        <nav
          className={
            BgColor + " transition-all duration-300 fixed w-full z-50 text-xs"
          }
        >
          <div className="flex justify-between max-h-16 h-full py-3 px-6">
            {/* right */}
            <div className="flex order-first items-center justify-between w-12 md:w-72 font-bold">
              <Link to="/" className="flex items-center justify-between">
                <img
                  src="src\assets\logo.png"
                  alt="logo"
                  className="h-14 w-14 p-2 hidden sm:flex text-center"
                />
                <div className={textColor + ` text-lg hidden sm:flex pl-3`}>
                  <span>Admin Panel</span>
                </div>
              </Link>
              <button
                className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200"
                onClick={() => dispatch(toggleSidebar())}
              >
                <MuiIcons.Menu className="h-6 w-6 text-dark text-bold" />
              </button>
            </div>
            {/* Menu at left */}
            <div className="flex order-last items-center w-72 justify-end">
              {/* Chat */}
              <Popover className="relative pl-2">
                {({ open }) => (
                  <>
                    <Popover.Button
                      onClick={SmartphoneAutoHideSidebar}
                      className={`
                ${open ? "" : "text-opacity-90"}
                rounded-md ${ComponentColor} font-extralight text-dark p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500`}
                    >
                      <div className="relative">
                        <MuiIcons.Sms className="flex h-6 w-6 relative ring-0" />
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
                          <div className="bg-red-500">
                            Nunggu Data Seeder di DB
                          </div>
                          <div className="flex justify-between relative bg-slate-50 shadow-xl shadow-black w-full p-3">
                            <span className="text-base font-medium">
                              List Chat
                            </span>
                            <Popover.Button className="hover:origin-center hover:scale-150 transition delay-100 font-bold">
                              <MuiIcons.Close
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
                                    <MuiIcons.Circle
                                      sx={{ fontSize: 12 }}
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
                                <MuiIcons.MoreHoriz />
                              </div>
                            </Link>
                          </div>
                          <div className="bg-gray-50">
                            <Link
                              to="/"
                              className="flex flex-1 justify-center items-center p-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <MuiIcons.RecordVoiceOver className="text-dark mr-4" />
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
              {/* <button className="pl-2 ring-0" onClick={() => dispatch(toggleSidebar())}>
                <div className="flex p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500">
                  <MuiIcons.NotificationsNone className="h-6 w-6 text-dark text-bold" />
                </div>
              </button> */}
              <Popover className="relative pl-2">
                {({ open }) => (
                  <>
                    <Popover.Button
                      onClick={SmartphoneAutoHideSidebar}
                      className={`
                ${open ? "" : "text-opacity-90"}
                rounded-md ${ComponentColor} font-extralight text-dark p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500`}
                    >
                      <div className="relative">
                        <MuiIcons.NotificationsNone className="flex h-6 w-6 relative ring-0" />
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
                          <div className="bg-red-500">
                            Nunggu Data Seeder di DB
                          </div>
                          <div className="flex justify-between relative bg-slate-50 shadow-xl shadow-black w-full p-3">
                            <span className="text-base font-medium">
                              List Notification
                            </span>
                            <Popover.Button className="hover:origin-center hover:scale-150 transition delay-100 font-bold">
                              <MuiIcons.Close
                                sx={{ fontSize: 20 }}
                                className="text-red-600 font-sm mr-2 hover:text-violet-600"
                              />
                            </Popover.Button>
                            {/* </button> */}
                          </div>
                          <div className="relative bg-white p-4 grid grid-cols-1 text-left overflow-y-scroll max-h-80">
                            {MarketNotification.slice(0, 5).map((item, bg) => (
                              <Link
                                key={item.id}
                                to={`/notification?${item.id}`}
                                className="border-b shadow-sm focus:ring-2 hover:ring-2 hover:ring-slate-300 p-2 flex items-center rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                  {item.status === "success" ? (
                                    /* Konten untuk status "success" */
                                    <MuiIcons.Insights className="text-lime-500" />
                                  ) : item.status === "danger" ? (
                                    /* Konten untuk status "danger" */
                                    <MuiIcons.DeleteForever className="text-red-500" />
                                  ) : item.status === "warning" ? (
                                    /* Konten untuk status "warning" */
                                    <MuiIcons.Announcement className="text-yellow-500" />
                                  ) : item.status === "info" ? (
                                    /* Konten untuk status "info" */
                                    <MuiIcons.Info className="text-blue-500" />
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
                                    <MuiIcons.Circle
                                      sx={{ fontSize: 12 }}
                                      className="text-red-600 font-sm mr-2"
                                    />
                                    {item.time}
                                  </p>
                                </div>
                              </Link>
                            ))}
                            <Link
                              to="/notification"
                              className="text-center p-3"
                            >
                              <div className="font-semibold bg-slate-200 rounded-2xl p-2">
                                <span className="pr-3">
                                  Check more Notification
                                </span>
                                <MuiIcons.MoreHoriz />
                              </div>
                            </Link>
                          </div>
                          <div className="bg-gray-50">
                            <Link
                              to="/"
                              className="flex flex-1 justify-center items-center p-3 rounded-md transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <MuiIcons.NotificationsActive className="text-dark mr-4" />
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
              <Popover className="relative pl-6">
                {({ open }) => (
                  <>
                    <Popover.Button
                      onClick={SmartphoneAutoHideSidebar}
                      className={`
                ${open ? "" : "text-opacity-90"}
                rounded-md ${ComponentColor} font-extralight text-dark rounded-xl bg-violet-200 hover:bg-violet-300 duration-500`}
                    >
                      <div className="relative avatar ">
                        <div className="w-10 rounded-full">
                          <img
                            src=".\src\assets\admin_avatar\sara.jpg"
                            alt="profile"
                            className="w-6 h-6 rounded-full text-center"
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
                          {/* <div className="flex justify-between relative bg-slate-50 shadow-xl shadow-black w-full p-3">
                              <span className="text-base font-medium"></span>
                            </div> */}{" "}
                          <div className="lg:p-4 py-2 px-2 flex flex-col w-full bg-slate-50 shadow-sm">
                            <div className="flex flex-row picture items-center px-4">
                              <div className="flex relative pr-4">
                                <img
                                  src=".\src\assets\admin_avatar\sara.jpg"
                                  alt="profile"
                                  className="w-14 h-14 rounded-full text-center"
                                />
                              </div>
                              <div className="flex flex-col text-left">
                                <p className="font-medium text-base">Admin1</p>
                                <p className="text-sm">Super Admin</p>
                              </div>
                            </div>
                          </div>
                          <div className="relative bg-white py-2 grid grid-cols-1 text-left overflow-y-scroll max-h-80">
                            <div className="flex flex-1 items-center py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                              <input
                                type="checkbox"
                                className="toggle"
                                onClick={() => {
                                  dispatch(darkTheme());
                                }}
                              />
                            </div>
                            <Link
                              to="/myprofile"
                              className="flex flex-1 items-center py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <MuiIcons.ManageAccounts className="text-dark mr-4" />
                              <p>My Profile</p>
                            </Link>
                            <Link
                              to="/myprofile"
                              className="flex flex-1 items-center py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <MuiIcons.Settings className="text-dark mr-4" />
                              <p>Settings</p>
                            </Link>
                            <Link
                              to="/login"
                              className="border-t-2 border-slate-200 flex flex-1 items-center mt-2 py-2 px-6 transition duration-150 ease-in-out hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <MuiIcons.LogoutOutlined className="text-dark mr-4" />
                              <p>Log Out</p>
                            </Link>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

{
  /* <Menu as="div" className="relative flex text-left px-4">
                <div>
                  <Menu.Button
                    className="flex rounded-xl bg-gray-200 hover:bg-blue-500 hover:text-white duration-200 items-center"
                    onClick={SmartphoneAutoHideSidebar}
                  >
                    <img
                      src=".\src\assets\admin_avatar\sara.jpg"
                      alt="profile"
                      className="w-9 h-9 rounded-full text-center"
                    />
                    <p className="px-4 font-semibold text-sm">RIFKY</p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute top-10 right-8 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/myprofile"
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <MuiIcons.ManageAccountsOutlined
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <MuiIcons.ManageAccounts
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <MuiIcons.SettingsOutlined
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <MuiIcons.Settings
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <MuiIcons.LogoutOutlined
                                className="mr-2 h-5 w-5 text-violet-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <MuiIcons.LogoutOutlined
                                className="mr-2 h-5 w-5 text-violet-400"
                                aria-hidden="true"
                              />
                            )}
                            Log Out
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */
}

export default Navbar;
