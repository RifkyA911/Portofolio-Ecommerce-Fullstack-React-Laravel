import React, { useState } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import * as MuiIcons from "@mui/icons-material";
import Toggle from "./Navbar";
// import SidebarButton from "./Buttons";
import { Link } from "react-router-dom";

const sideNavigation = [
  {
    name: "Dashboard",
    href: "/",
    current: true,
    icon: "DesktopWindowsOutlined",
  },
  {
    name: "Inbox",
    href: "/inbox",
    current: false,
    icon: "Mail",
  },
  { name: "Users", href: "/users", current: false, icon: "PeopleAlt" },
  {
    name: "Statistic",
    href: "/statistic",
    current: false,
    icon: "BarChart",
  },
  {
    name: "My Profile",
    href: "/profile",
    current: false,
    icon: "ManageAccounts",
  },
  { name: "Settings", href: "/settings", current: false, icon: "Settings" },
];

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
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

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="bg-white">
      {/* Sidebar */}
      <div
        className={`overflow-hidden hover:overflow-y-scroll bg-slate-200 text-dark font-medium fixed h-full mt-16 w-64 flex-shrink-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-center ">
          <HeroIcons.HomeIcon className="h-6 w-6 mr-4" />
          <p>My Admin Panel</p>
        </div>
        <nav className="flex-1 overflow-hidden shadow-sm h-full">
          <ul className="py-4 space-y-1 text-left">
            {sideNavigation.map((item) => (
              <li key={item.name} className="flex items-center">
                <Link
                  to={item.href} // Menggunakan prop 'to' daripada 'href'
                  onClick={() => handlePageChange("dashboard")}
                  className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
                    item.current
                      ? "bg-violet-200 text-gray-800"
                      : "text-gray-800 hover:bg-violet-100"
                  }`}
                >
                  {getMuiIconComponent(item.icon)}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
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
