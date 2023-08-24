import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import { Container, Navbar, Sidebar } from "./components"; // ./components/index.jsx

import "./App.css";
import { FiSettings } from "react-icons/fi";
import Button from "@mui/material/Button";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wideScreen, setWideScreen] = useState("lg:ml-64");
  const [count, setCount] = useState(6);

  const toggleStates = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    setWideScreen((prevWideScreen) =>
      prevWideScreen === "lg:ml-64" ? "lg:ml-0" : "lg:ml-64"
    );
  };
  return (
    <>
      <Navbar toggleStates={toggleStates} />
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleStates} />
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

      <div className="backdrop-blur-sm bg-opacity-60 bg-white w-60 fixed left-2/4 bottom-0 z-50 rounded-xl shadow-lg hover:font-bold duration-200">
        <div className="flex flex-col">
          <span className="bg-cyan-500 font-bold">DEBUGGER</span>
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
          <Link to="#">
            <Button variant="contained">X</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
