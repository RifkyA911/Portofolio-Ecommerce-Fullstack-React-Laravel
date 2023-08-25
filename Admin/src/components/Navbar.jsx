import { Fragment, useEffect, useRef, useState, React } from "react";
import { Link } from "react-router-dom";

import { Menu, Transition, Popover } from "@headlessui/react";
import { FcAbout } from "react-icons/fc";
import { ChevronDownIcon, HashtagIcon } from "@heroicons/react/20/solid";
import * as MuiIcons from "@mui/icons-material";

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
    icon: IconOne,
  },
  {
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
    icon: IconTwo,
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
    icon: IconThree,
  },
];
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

          {/* left */}
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
                    <MuiIcons.Mail className="h-6 w-6" />
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
                    <Popover.Panel className="-translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl z-10 mt-3 absolute w-96">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white p-7 grid grid-cols-1 gap-4 text-left">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-center rounded-lg p-4 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                <item.icon aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-4">
                          <a
                            href="##"
                            className="flex items-center rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <span className="">
                              <span className="text-sm font-medium text-gray-900">
                                Documentation
                              </span>
                            </span>
                            <span className="block text-sm text-gray-500">
                              Start integrating products and tools
                            </span>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {/* notification */}
            <button className="pl-2">
              <div className="flex p-2 rounded-xl bg-violet-200 hover:bg-violet-300 duration-500">
                <MuiIcons.NotificationsNone className="h-6 w-6 text-dark text-bold" />
              </div>
            </button>
            {/* profile */}
            <button className="pl-4">
              <div className="flex rounded-xl bg-gray-200 hover:bg-blue-500 hover:text-white duration-200 items-center">
                <img
                  src="\src\assets\user.jpg"
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

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

export { Toggle };
export default Navbar;
