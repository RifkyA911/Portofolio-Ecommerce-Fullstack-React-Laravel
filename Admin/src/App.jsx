import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "./App.css";
import { Dashboard, Users, Settings, Navbar, Sidebar } from "./components"; // ./components/index.jsx

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="app flex pt-16 min-h-screen">
          <Sidebar />
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
