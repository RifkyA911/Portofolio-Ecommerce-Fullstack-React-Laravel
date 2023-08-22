import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import "./App.css";
import { Dashboard, Users, Settings, Navbar, Sidebar } from "./components"; // ./components/index.jsx

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <div className="app flex pt-14 min-h-screen max-w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
