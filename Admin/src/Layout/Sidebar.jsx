import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { sideNavigation } from "../Config/PagesLink";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, darkTheme } from "../Redux/Slices/UISlice";
// Utility
import { getMuiIcon } from "../utils/RenderIcons";
import { getUser } from "../utils/Session/Admin";

const Sidebar = () => {
  const [current, setCurrent] = useState("Dashboard");

  // REDUX
  const { BgColor, textColor, screenWidth, sidebarOpen } = useSelector(
    (state) => state.UI
  );
  const { showNav } = useSelector((state) => state.navigation);
  const dispatch = useDispatch();
  const userSession = getUser();

  const SidebarHandler = (key) => {
    setCurrent(key); // active current page
    screenWidth < 1024 ? dispatch(toggleSidebar(false)) : undefined; // responsive smartphone utilites for sidebar autohide
  };

  return (
    <>
      {showNav ? (
        userSession ? (
          <>
            <div className="bg-black">
              {/* Sidebar */}
              <div
                onClick={() => dispatch(toggleSidebar(false))}
                className={` lg:hidden ${sidebarOpen ? "" : "hidden"}
            cursor-pointer backdrop-blur-sm bg-opacity-50 bg-gray-800 fixed w-full h-full z-[20] transition duration-200`}
              ></div>
              <div
                className={
                  BgColor +
                  " " +
                  textColor +
                  ` overflow-scroll hover:overflow-y-scroll text-sm font-medium fixed h-full mt-16 w-64 flex-shrink-0 transition-all duration-300 z-30 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`
                }
              >
                <nav className="flex h-full z-[100]">
                  <ul className="flex-row w-full py-4 text-left h-full">
                    {sideNavigation.map((group) => (
                      <div key={group.GroupID}>
                        <h3
                          className={
                            textColor +
                            ` ml-0 px-6 py-2 flex items-center justify-left font-sm`
                          }
                        >
                          {group.GroupName}
                        </h3>
                        <ul>
                          {group.Links.map((link) => (
                            <li key={link.id} className="my-1 mx-4">
                              <Link
                                to={link.href}
                                onClick={() => SidebarHandler(link.name)}
                                className={`flex flex-row items-center w-full px-6 py-2 rounded-lg ${
                                  link.name === current
                                    ? "bg-violet-200 text-gray-800"
                                    : "hover:text-gray-800 hover:bg-violet-100"
                                }`}
                              >
                                <i className="mr-4">{getMuiIcon(link.icon)}</i>

                                <span className="text-sm">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="pb-16"></div>
                    <Outlet />
                  </ul>
                  {/* <ul>s</ul> */}
                </nav>
              </div>
            </div>
          </>
        ) : (
          <>{console.log("Hide Sidebar")}</>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
