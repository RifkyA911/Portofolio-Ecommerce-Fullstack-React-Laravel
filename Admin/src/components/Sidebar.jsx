import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { sideNavigation } from "./Data/PagesLink";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { changeScreen } from "../Redux/Slices/UISlice";

import { getMuiIconComponent } from "../utils/MuiComponent";

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
                {sideNavigation.map((group) => (
                  <div key={group.GroupID}>
                    <h3
                      className={
                        textColor +
                        `h-12 ml-0 px-6 py-2 flex items-center justify-left font-sm`
                      }
                    >
                      {group.GroupName}
                    </h3>
                    <ul>
                      {group.Links.map((link) => (
                        <li key={link.id}>
                          <Link
                            to={link.href}
                            onClick={() => SidebarHandler(link.name)}
                            className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
                              link.name === current
                                ? "bg-violet-200 text-gray-800"
                                : textColor + " hover:bg-violet-100"
                            }`}
                          >
                            {getMuiIconComponent(link.icon)}
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
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
