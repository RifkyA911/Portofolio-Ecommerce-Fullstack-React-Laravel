import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "./App.css";
import {
  Dashboard,
  Users,
  Settings,
  Navbar,
  Sidebar,
  Topbar,
} from "./components"; // ./components/index.jsx

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Sidebar />
          <div className="content">
            {/* <nav>
              <ul>
                <li>
                  <a href={`/`}>Dashboard</a>
                </li>
                <li>
                  <a href={`/users`}>Users</a>
                </li>
                <li>
                  <a href={`/settings`}>Settings</a>
                </li>
              </ul>
            </nav> */}

            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
