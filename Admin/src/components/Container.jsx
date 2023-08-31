import React, { useState } from "react";
import {
  Dashboard,
  Admins,
  Settings,
  Inbox,
  Statistic,
  MyProfile,
  Notification,
  Products,
  Warehouse,
} from "./Pages/index";
import { FiSettings } from "react-icons/fi";

export default function Container({
  showNav,
  selectedPage,
  wideScreen,
  toggleWideScreen,
}) {
  return (
    <>
      <main className="bg-white w-full static">
        <div
          className={`p-4 my-4 ${wideScreen} h-full shadow-lg flex-shrink-0 duration-300`}
        >
          <div className="bg-slate-100 rounded-xl shadow-sm">
            {(() => {
              switch (selectedPage) {
                case "login":
                  return <p>login</p>;
                case "dashboard":
                  return <Dashboard />;
                case "admins":
                  return <Admins />;
                case "products":
                  return <Products />;
                case "warehouse":
                  return <Warehouse />;
                case "settings":
                  return <Settings />;
                case "inbox":
                  return <Inbox />;
                case "statistic":
                  return <Statistic />;
                case "myprofile":
                  return <MyProfile />;
                case "notification":
                  return <Notification />;
              }
            })()}
          </div>
        </div>
      </main>
    </>
  );
}
