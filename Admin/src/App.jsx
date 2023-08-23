import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import "./App.css";
import { Container, Navbar, Sidebar } from "./components"; // ./components/index.jsx
// import Users from "./components/Pages/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Sidebar />
        <div className="app flex pt-14 min-h-screen max-w-full">
          <Routes>
            <Route path="/" element={<Container selectedPage="dashboard" />} />
            <Route path="/Users" element={<Container selectedPage="users" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
