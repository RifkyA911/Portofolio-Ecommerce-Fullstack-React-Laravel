import React, { useState } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import * as MuiIcons from "@mui/icons-material";
import Navbar from "./Navbar";

const sideNavigation = [
  { name: "Dashboard", href: "/", current: true, icon: "ComputerDesktopIcon" },
  {
    name: "Inbox",
    href: "/inbox",
    current: false,
    icon: "ChatBubbleOvalLeftIcon",
  },
  { name: "Users", href: "/users", current: false, icon: "UsersIcon" },
  { name: "Revenue", href: "/revenue", current: false, icon: "HomeIcon" },
  { name: "Statistic", href: "/statistic", current: false, icon: "HomeIcon" },
  { name: "My Profile", href: "/profile", current: false, icon: "UserIcon" },
  { name: "Settings", href: "/settings", current: false, icon: "CogIcon" },
];

//HeroIcons.ComputerDesktopIcon

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toggle, setToggle] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const Toggler = () => {
    setToggle((prevToggle) => !prevToggle);
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

  return (
    <div className="bg-white">
      <Navbar toggleSidebar={toggleSidebar} NavbarSidebar={Toggler} />
      {/* Sidebar */}
      <div
        className={`bg-slate-200 text-dark font-medium fixed h-full mt-16 w-64 flex-shrink-0 overflow-hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-center">
          <HeroIcons.HomeIcon className="h-6 w-6 mr-4" />
          My Admin Panel
        </div>
        <nav className="flex-1 overflow-hidden shadow-sm h-full">
          <ul className="py-4 space-y-1 text-left">
            {sideNavigation.map((item) => (
              <li key={item.name} className="flex items-center">
                <a
                  href={item.href}
                  className={`flex flex-row items-center w-full mx-4 px-6 py-3 rounded-xl ${
                    item.current
                      ? "bg-violet-200 text-gray-800"
                      : "text-gray-800 hover:bg-violet-100"
                  }`}
                >
                  {getHeroIconComponent(item.icon)}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div></div>
    </div>
  );
};

export default Sidebar;
