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
} from "../Pages";
import NotFound, {
  Forbidden,
  RedirectPage,
  Unauthorized,
} from "../Pages/Error/Error";

function MyAppRoutes() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userSession == null) {
  //     // tambahkan semua kategori
  //     navigate("/");
  //   }
  // }
  // Konten komponen
  return (
    <>
      <Sidebar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admins" element={<Admins />} />
        {/* <Route path="/admins" element={<Unauthorized />} /> */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/orders" element={<Order />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Forbidden />} />
        <Route path="/logout" element={<>LogOut</>} />
      </Routes>
    </>
  );
}
export default MyAppRoutes;
