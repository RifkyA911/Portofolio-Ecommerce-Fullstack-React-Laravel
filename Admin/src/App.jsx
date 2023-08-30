import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Navbar, Sidebar } from "./components"; // ./components/index.jsx

import "./App.css";
// import UI Component
import { FiSettings } from "react-icons/fi";
import Button from "@mui/material/Button";

function App() {
  // login component
  //...
  // navigation component
  const [sidebarOpen, setSidebarOpen] = useState();
  const [wideScreen, setWideScreen] = useState("lg:ml-64");
  const [showNav, setShowNav] = useState();
  // container component
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const location = useLocation();

  useEffect(() => {
    const allowedPaths = [
      "/",
      "/admins",
      "/inbox",
      "/settings",
      "/statistic",
      "/myprofile",
    ];
    setShowNav(allowedPaths.includes(location.pathname));
    console.log("nav : " + showNav);
  }, [location]);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  const checkWindowsWidth = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
      setWideScreen("lg:ml-64");
    }
  };

  useEffect(() => {
    checkWindowsWidth();
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, [windowWidth]);

  const toggleHideSidebar = () => {
    if (windowWidth < 1024) {
      setSidebarOpen((prevSidebarOpen) => (prevSidebarOpen = false));
      setWideScreen((prevWideScreen) => (prevWideScreen = "lg:ml-0"));
    }
  };

  const toggleStates = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    setWideScreen((prevWideScreen) =>
      prevWideScreen === "lg:ml-64" ? "lg:ml-0" : "lg:ml-64"
    );
  };
  return (
    <>
      <Navbar
        showNav={showNav}
        toggleStates={toggleStates}
        toggleHideSidebar={toggleHideSidebar}
      />
      <Sidebar
        showNav={showNav}
        sidebarOpen={sidebarOpen}
        toggleStates={toggleStates}
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
            path="/admins"
            element={
              <Container
                selectedPage="admins"
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
          <Route
            path="/Testing"
            element={
              <Container
                selectedPage="Testing"
                wideScreen={wideScreen}
                toggleWideScreen={toggleStates}
              />
            }
          />
        </Routes>
      </div>

      {/* ============================================================================================= */}

      <div className="cursor-pointer backdrop-blur-sm bg-opacity-60 bg-white w-60 fixed left-2/4 bottom-0 z-50 rounded-xl shadow-lg hover:font-semibold hover:bg-violet-400 duration-200">
        <div className="flex-row p-2">
          <div className="flex flex-col ">
            <div className="font-bold">Debugger Panel</div>
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
