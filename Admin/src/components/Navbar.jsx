import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, React } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as MuiIcons from "@mui/icons-material";
// import WideScreenButton from "./Buttons";

const Navbar = (props, changeWideScreen) => {
  const sum = (a, b) => {
    return a + b;
  };

  const multiply = (a, b) => {
    return a * b;
  };
  return (
    <>
      <nav className="bg-slate-200 fixed w-full z-50">
        <div className=" flex justify-between max-h-16 h-full py-3 px-6">
          <div className="flex order-first items-center justify-between w-72 font-bold">
            <div className="text-lg font-bold hidden sm:flex">Admin Panel</div>
            <button
              className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200"
              onClick={props.toggleSidebar}
            >
              <MuiIcons.Menu className="h-6 w-6 text-dark text-bold" />
            </button>
            <button
              className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200"
              onClick={props.toggleWideScreen}
            >
              <MuiIcons.Laptop className="h-6 w-6 text-dark text-bold" />
            </button>
          </div>

          {/* Profile */}
          <div className="flex order-last items-center w-72 justify-end">
            <button className="">
              <div className="flex p-2 rounded-xl transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200">
                <MuiIcons.NotificationsNone className="h-6 w-6 text-dark text-bold" />
              </div>
            </button>
            <button className="pl-2">
              <div className="flex p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200">
                <img
                  src="\src\assets\user.jpg"
                  alt="profile"
                  className="w-8 h-8 rounded-full text-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
