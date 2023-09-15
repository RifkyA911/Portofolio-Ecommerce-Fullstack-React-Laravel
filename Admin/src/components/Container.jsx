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
import { useDispatch, useSelector } from "react-redux";

export default function Container({ selectedPage }) {
  // REDUX
  const { screenWidth, sidebarOpen } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  return (
    <>
      <main className="bg-white w-full static">
        <div
          className={`p-4 my-4 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-0"
          } h-full shadow-lg flex-shrink-0 duration-300`}
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
