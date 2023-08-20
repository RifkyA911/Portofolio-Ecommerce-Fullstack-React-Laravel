import React from "react";

const sideNavigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Inbox", href: "#", current: true },
  { name: "Users", href: "#", current: true },
  { name: "Revenue", href: "#", current: false },
  { name: "Statistic", href: "#", current: false },
  { name: "My Profile", href: "#", current: false },
];

export default function Sidebar() {
  return (
    <div className="flex pt-16 min-h-screen">
      <div className="flex flex-col p-4 bg-white drop-shadow-lg w-80">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-l font-bold">Dashboard</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-white w-full"></div>
    </div>
  );
}
