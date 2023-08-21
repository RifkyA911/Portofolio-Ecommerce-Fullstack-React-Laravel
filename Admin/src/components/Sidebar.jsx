import React, { useState } from "react";

const sideNavigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inbox", href: "#", current: false },
  { name: "Users", href: "/users", current: false },
  { name: "Revenue", href: "#", current: false },
  { name: "Statistic", href: "#", current: false },
  { name: "My Profile", href: "#", current: false },
  { name: "Settings", href: "/settings", current: false },
];

const Sidebar = ({ toggleNavbar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-56 flex-shrink-0 overflow-hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-center">
          Sidebar Logo
        </div>
        <nav className="flex-1 overflow-hidden">
          <ul className="py-4 space-y-1 text-left">
            {sideNavigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`block pl-4 pr-6 py-2 ${
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <button
          className="toggler flex-shrink-0 p-2 text-gray-500"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
