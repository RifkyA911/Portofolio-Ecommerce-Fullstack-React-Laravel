import React from "react";

const sideNavigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inbox", href: "#", current: false },
  { name: "Users", href: "/users", current: false },
  { name: "Revenue", href: "#", current: false },
  { name: "Statistic", href: "#", current: false },
  { name: "My Profile", href: "#", current: false },
  { name: "Settings", href: "/settings", current: false },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col p-5 bg-white drop-shadow-md w-80">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-l font-bold">Menu</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {sideNavigation.map((item) => (
              <li key={item.name} className="rounded-sm">
                <a
                  href={item.href}
                  className={`flex items-center p-2 space-x-3 rounded-md ${
                    item.current ? "text-black font-semibold" : "text-gray-600"
                  }`}
                >
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
