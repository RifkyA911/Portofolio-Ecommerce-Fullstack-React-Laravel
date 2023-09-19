import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import React from "react";
import { Navbar, Sidebar } from "../Layout"; // ./components/index.jsx
import {
  Dashboard,
  Admins,
  Chat,
  Invoices,
  MyProfile,
  Notification,
  Order,
  Products,
  Settings,
  Statistic,
  NotFound,
  Login,
} from "../Pages";

function MyAppRoutes() {
  // Konten komponen
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app flex pt-14 min-h-screen max-w-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/orders" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
export default MyAppRoutes;
