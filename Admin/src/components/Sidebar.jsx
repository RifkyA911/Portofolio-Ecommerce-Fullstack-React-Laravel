import { useState } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import * as MuiIcons from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const sideNavigation = [
  {
    group: "Dashboard",
    name: "Dashboard",
    href: "/",
    icon: "DesktopWindowsOutlined",
  },
  {
    group: "Market",
    name: "Inbox",
    href: "/inbox",
    icon: "Mail",
  },
  {
    group: "Market",
    name: "Statistic",
    href: "/statistic",
    icon: "BarChart",
  },
  {
    group: "Management",
    name: "Users",
    href: "/users",
    icon: "PeopleAlt",
  },
  {
    group: "Management",
    name: "My Profile",
    href: "/myprofile",
    icon: "ManageAccounts",
  },
  {
    group: "Management",
    name: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

const Sidebar = ({ toggleStates, sidebarOpen, toggleSidebar }) => {
  const [current, setCurrent] = useState("Dashboard");

  const handleLinkClick = (key) => {
    setCurrent(key);
    screenWidth < 1024 ? toggleSidebar() : undefined;
  };

  const getHeroIconComponent = (iconName) => {
    const HeroIconComponent = HeroIcons[iconName];
    if (HeroIconComponent) {
      return <HeroIconComponent className="h-6 w-6 mr-4" />;
    }
    return null;
  };

  const getMuiIconComponent = (iconName) => {
    const MuiIconComponent = MuiIcons[iconName];
    if (MuiIconComponent) {
      return <MuiIconComponent className="h-6 w-6 mr-4" />;
    }
    return null;
  };

  const screenWidth = window.innerWidth;

  return (
    <div className="bg-white">
      {/* Sidebar */}

      <div
        onClick={toggleStates}
        className={` lg:hidden ${sidebarOpen ? "" : "hidden"}
        cursor-pointer backdrop-blur-sm bg-opacity-50 bg-gray-800 fixed w-full h-full z-20 transition duration-200`}
      ></div>

      <div
        className={`overflow-hidden xhover:overflow-y-scroll bg-slate-200 text-sm text-dark font-medium fixed h-full mt-16 w-64 flex-shrink-0 transition-transform duration-300 z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex-1 overflow-hidden shadow-sm h-full">
          <ul className="py-4 space-y-1 text-left">
            <div className="h-14 ml-0 px-6 py-2 flex items-center justify-left font-sm">
              <p>Dashboard</p>
            </div>
            {sideNavigation.map((item) => {
              if (item.group === "Dashboard") {
                return (
                  <li key={item.name} className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={() => handleLinkClick(item.name)}
                      className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
                        item.name === current
                          ? "bg-violet-200 text-gray-800"
                          : "text-gray-800 hover:bg-violet-100"
                      }`}
                    >
                      {getMuiIconComponent(item.icon)}
                      {item.name}
                    </Link>
                  </li>
                );
              } else if (item.group === "Market") {
                return (
                  <li key={item.name} className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={() => handleLinkClick(item.name)}
                      className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
                        item.name === current
                          ? "bg-violet-200 text-gray-800"
                          : "text-gray-800 hover:bg-violet-100"
                      }`}
                    >
                      {getMuiIconComponent(item.icon)}
                      {item.name}
                    </Link>
                  </li>
                );
              } else if (item.group === "Management") {
                return (
                  <li key={item.name} className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={() => handleLinkClick(item.name)}
                      className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
                        item.name === current
                          ? "bg-violet-200 text-gray-800"
                          : "text-gray-800 hover:bg-violet-100"
                      }`}
                    >
                      {getMuiIconComponent(item.icon)}
                      {item.name}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
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
        </nav>
      </div>
      {/* Main Content */}
      <div></div>
    </div>
  );
};

export default Sidebar;
