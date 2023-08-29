import React, { useState } from "react";
import {
  Dashboard,
  Admins,
  Settings,
  Inbox,
  Statistic,
  MyProfile,
} from "./Pages/index";
import Navbar from "./Navbar";
import { FiSettings } from "react-icons/fi";

export default function Container({
  selectedPage,
  wideScreen,
  toggleWideScreen,
}) {
  return (
    <>
      {/* <Navbar toggleWideScreen={toggleWideScreen} WideScreen={WToggler} /> */}
      <main className="bg-white w-full static">
        <div
          className={`p-4 my-4 ${wideScreen} h-full shadow-lg flex-shrink-0 duration-300`}
        >
          <div className="bg-slate-100 rounded-xl shadow-sm">
            {(() => {
              switch (selectedPage) {
                case "dashboard":
                  return <Dashboard />;
                case "admins":
                  return <Admins />;
                case "settings":
                  return <Settings />;
                case "inbox":
                  return <Inbox />;
                case "statistic":
                  return <Statistic />;
                case "myprofile":
                  return <MyProfile />;
                default:
                  return <NotFound />;
              }
            })()}
          </div>
        </div>
      </main>
    </>
  );
}
