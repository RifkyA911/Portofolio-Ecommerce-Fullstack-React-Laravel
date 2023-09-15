import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { sideNavigation } from "./Data/PagesLink";

import * as HeroIcons from "@heroicons/react/24/solid";
import * as MuiIcons from "@mui/icons-material";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Redux/Slices/UISlice";

const Sidebar = ({ showNav, toggleStates }) => {
  const [current, setCurrent] = useState("Dashboard");
  // REDUX
  const { BgColor, textColor, screenWidth, sidebarOpen } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();

  const SidebarHandler = (key) => {
    setCurrent(key); // active current page
    screenWidth < 1024 ? dispatch(toggleSidebar(false)) : undefined; // responsive utilites for sidebar autohide
  };

  const renderSidebarItem = (
    item // sidebar's menus component
  ) => (
    <>
      <li key={item.id} className="flex items-center">
        <Link
          to={item.href}
          onClick={() => SidebarHandler(item.name)}
          className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
            item.name === current
              ? "bg-violet-200 text-gray-800"
              : textColor + " hover:bg-violet-100"
          }`}
        >
          {getMuiIconComponent(item.icon)}
          {item.name}
        </Link>
      </li>
    </>
  );
  // console.log("sidebar is:" + sidebarOpen);

  const getMuiIconComponent = (iconName) => {
    const MuiIconComponent = MuiIcons[iconName];
    if (MuiIconComponent) {
      return <MuiIconComponent className="h-6 w-6 mr-4" />;
    }
    return null;
  };

  return (
    <>
      {showNav == true ? (
        <div className="bg-white">
          {/* Sidebar */}
          <div
            onClick={() => dispatch(toggleSidebar())}
            className={` lg:hidden ${sidebarOpen ? "" : "hidden"}
            cursor-pointer backdrop-blur-sm bg-opacity-50 bg-gray-800 fixed w-full h-full z-20 transition duration-200`}
          ></div>
          <div
            className={
              BgColor +
              " " +
              textColor +
              ` overflow-hidden xhover:overflow-y-scroll text-sm font-medium fixed h-full mt-16 w-64 flex-shrink-0 transition-all duration-300 z-30 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            }
          >
            <nav className="flex-1 xoverflow-y-scroll shadow-sm h-full">
              <ul className="flex-row py-4 space-y-1 text-left">
                {sideNavigation.map((item, index) => (
                  <div key={item.id}>
                    {index === 0 ||
                    item.group !== sideNavigation[index - 1].group ? (
                      <div
                        className={
                          textColor +
                          `h-12 ml-0 px-6 py-2 flex items-center justify-left font-sm`
                        }
                      >
                        <p>{item.group}</p>
                      </div>
                    ) : null}
                    {renderSidebarItem(item)}
                  </div>
                ))}
                <Outlet />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

// const getHeroIconComponent = (iconName) => {
//   const HeroIconComponent = HeroIcons[iconName];
//   if (HeroIconComponent) {
//     return <HeroIconComponent className="h-6 w-6 mr-4" />;
//   }
//   return null;
// };

export default Sidebar;
