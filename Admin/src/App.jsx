import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import React, { useState } from "react";
import "./App.css";
import { Container, Navbar, Sidebar } from "./components"; // ./components/index.jsx
// import Users from "./components/Pages/Users";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wideScreen, setWideScreen] = useState("lg:ml-64");

  const toggleStates = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    setWideScreen((prevWideScreen) =>
      prevWideScreen === "lg:ml-64" ? "" : "lg:ml-64"
    );
  };
  return (
    <>
      <BrowserRouter>
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
              path="/Users"
              element={
                <Container
                  selectedPage="users"
                  wideScreen={wideScreen}
                  toggleWideScreen={toggleStates}
                />
              }
            />
            <Route
              path="/settings"
              element={<Container selectedPage="settings" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
