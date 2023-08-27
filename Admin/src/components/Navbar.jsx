import { Fragment, useEffect, useRef, useState, React } from "react";
import { Link, Outlet } from "react-router-dom";
import { MarketInbox } from "./Data/Inbox";

import { Menu, Transition, Popover } from "@headlessui/react";
import * as MuiIcons from "@mui/icons-material";
// import Badge from "@mui/material/Badge";
// import { FcAbout } from "react-icons/fc";

//===================================
const ThemeBG = [{ iconBG: "bg-violet-200" }];
const Toggle = ({ toggleStates }) => {
  return (
    <>
      <button
        className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200"
        onClick={toggleStates}
      >
        <MuiIcons.Menu className="h-6 w-6 text-dark text-bold" />
      </button>
    </>
  );
};

const Navbar = ({ toggleStates }) => {
  return (
    <>
      <nav className="bg-slate-200 fixed w-full z-50 text-xs">
        <div className=" flex justify-between max-h-16 h-full py-3 px-6">
          {/* right */}
          <div className="flex order-first items-center justify-between w-12 md:w-72 font-bold">
            <Link to="/" className="flex items-center justify-between">
              <img
                src="src\assets\logo.png"
                alt="logo"
                className="h-14 w-14 p-2 hidden sm:flex text-center"
              />
              <div className="text-lg hidden sm:flex pl-3">
                <span>Admin Panel</span>
              </div>
            </Link>
            <Toggle toggleStates={toggleStates} />
          </div>
          {/* Menu at left */}
          <div className="flex order-last items-center w-72 justify-end">
            {/* mail */}
            <Popover className="relative pl-2">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                rounded-md ${
                  ThemeBG[0].iconBG
                } font-extralight text-dark p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500`}
                  >
                    <div className="relative">
                      <MuiIcons.Mail className="flex h-6 w-6 relative ring-0" />
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
                    <Popover.Panel className="-translate-x-[40%]  lg:-translate-x-[90%] transform px-4 sm:px-0 lg:max-w-3xl z-10 mt-3 absolute w-96">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="flex justify-between relative bg-slate-50 shadow-xl shadow-black w-full p-3">
                          <span className="text-base font-medium">
                            List Inbox
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
            <button className="pl-2 ring-0">
              <div className="flex p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500">
                <MuiIcons.NotificationsNone className="h-6 w-6 text-dark text-bold" />
              </div>
            </button>
            {/* profile */}
            <button className="pl-4">
              <div className="flex rounded-xl bg-gray-200 hover:bg-blue-500 hover:text-white duration-200 items-center">
                <img
                  src=".\src\assets\admin_avatar\sara.jpg"
                  alt="profile"
                  className="w-9 h-9 rounded-full text-center"
                />
                <p className="px-4 font-semibold text-sm">RIFKY</p>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Toggle };
export default Navbar;
