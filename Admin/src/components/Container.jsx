import React, { useState } from "react";
import { Dashboard, Users, Settings } from "./Pages/index";
import Navbar from "./Navbar";

export default function Container({ selectedPage, ChangeWideScreen }) {
  const [wideScreen, setWideScreen] = useState("lg:ml-64");
  const [WToggle, setWToggle] = useState(false);

  const toggleWideScreen = () => {
    setWideScreen(wideScreen === "lg:ml-64" ? "lg:ml-0" : "lg:ml-64");
    console.log(wideScreen);
  };

  const WToggler = () => {
    setWToggle((prevWToggle) => !prevWToggle);
  };
  // Konten komponen
  return (
    <>
      <Navbar toggleWideScreen={toggleWideScreen} WideScreen={WToggler} />
      <div className="bg-white w-full static">
        <div
          className={`p-4 my-4 ${wideScreen} h-full shadow-lg transition-transform duration-300`}
        >
          <div className="bg-gray-100 rounded-xl shadow-sm">
            {(() => {
              switch (selectedPage) {
                case "dashboard":
                  return <Dashboard />;
                case "users":
                  return <Users />;
                case "settings":
                  return <Settings />;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
