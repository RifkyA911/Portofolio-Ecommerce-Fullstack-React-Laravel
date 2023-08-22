import React from "react";
import * as HeroIcons from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    <nav className="bg-slate-200 fixed w-full z-50">
      {/* <p>{aku}</p> */}
      <div className="container mx-auto flex justify-between items-center max-h-16 h-full py-3 px-8">
        <div className="text-lg font-bold">Admin Panel</div>
        <button
          className="toggler flex-shrink-0 p-2 text-gray-500"
          // onClick={toggleSidebar}
        >
          <HeroIcons.Bars3Icon className="h-6 w-6 text-dark text-bold" />
        </button>

        {/* Profile */}
        <div className="flex">
          <button className="">
            <div className="flex bg-violet-200 p-2 rounded-xl">
              <HeroIcons.BellIcon className="h-6 w-6 mx-auto text-center " />
            </div>
          </button>
          <button className=" mr-4 p-3">
            <div className="flex bg-violet-200 p-2">
              <img
                src="\src\assets\user.png"
                alt="profile"
                className="w-8 h-8 rounded-full text-center"
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
