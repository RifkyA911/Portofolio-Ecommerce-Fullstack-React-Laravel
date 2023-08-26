import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Navbar, Sidebar } from "./components"; // ./components/index.jsx

import "./App.css";
import { FiSettings } from "react-icons/fi";
import Button from "@mui/material/Button";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wideScreen, setWideScreen] = useState("lg:ml-64");
  const [count, setCount] = useState(6);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  const toggleStates = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    setWideScreen((prevWideScreen) =>
      prevWideScreen === "lg:ml-64" ? "lg:ml-0" : "lg:ml-64"
    );
  };
  return (
    <>
      <Navbar toggleStates={toggleStates} />
      <Sidebar
        toggleStates={toggleStates}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleStates}
      />
      <div className="app flex pt-14 min-h-screen max-w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Container
                selectedPage="dashboard"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
          <Route
            path="/users"
            element={
              <Container
                selectedPage="users"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
          <Route
            path="/inbox"
            element={
              <Container
                selectedPage="inbox"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Container
                selectedPage="settings"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
          <Route
            path="/statistic"
            element={
              <Container
                selectedPage="statistic"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
          <Route
            path="/myprofile"
            element={
              <Container
                selectedPage="myprofile"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
        </Routes>
      </div>

      {/* ============================================================================================= */}

      <div className="cursor-pointer backdrop-blur-sm bg-opacity-60 bg-white w-60 fixed left-2/4 bottom-0 z-50 rounded-xl shadow-lg hover:font-bold duration-200">
        <div className="flex flex-col ">
          <div className="bg-cyan-400 font-bold">DEBUGGER</div>
          <div className="flex-row p-2">
            <button
              className="px-3 py-2 bg-red-400"
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
            <button
              className="px-3 py-2 bg-green-400"
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
            <span className="px-4">{count}</span>
          </div>
          <div>
            Width: {windowWidth} Height: {windowHeight}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
