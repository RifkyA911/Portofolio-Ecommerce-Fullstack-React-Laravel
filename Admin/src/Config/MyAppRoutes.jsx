import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { Navbar, Sidebar, Footer } from "../Layout"; // ./components/index.jsx
// //import config data
// import { allowedPaths } from "./utils/Navigation";
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
import { getUser, logOutUser } from "./../Config/Session";

import { useDispatch } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";

function MyAppRoutes() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const dispatch = useDispatch();
  const currentUser = getUser();

  // useEffect(() => {
  //   // dispatch(setCurrentSidebar(location.pathname));
  //   console.log(currentUser);
  // }, [currentUser]);
  // Konten komponen
  return (
    // <>
    //   {currentUser !== null && currentUser !== undefined ? (
    <>
      <Sidebar />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        {currentUser.role !== 0 && (
          <Route path="/admins" element={<Unauthorized />} />
        )}
        {currentUser.role === 0 && (
          <Route path="/admins" element={<Admins />} />
        )}
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
      <Footer />
    </>
    //   ) : (
    //     <p>no session</p>
    //   )}
    // </>
  );
}
export default MyAppRoutes;
