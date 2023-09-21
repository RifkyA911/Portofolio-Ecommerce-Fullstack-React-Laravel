// import UI Component
import "./App.css";
// React
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
//import config data
import { allowedPaths } from "./utils/Navigation";
// Pages

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "./Redux/Slices/UISlice";
import { navLink } from "./Redux/Slices/NavigationSlice";

// Utils
import MyAppRoutes from "./Config/MyAppRoutes";
import MyDebuggerPanel from "./utils/MyDebuggerPanel";
import { getUser } from "./utils/Session/Admin";
import Footer from "./Layout/Footer";
import { Navbar, Sidebar } from "./Layout";
import LoginRouter from "./Config/LoginRouter";
// import Summary from "./utils/Summary";

function App() {
  // login component
  const [userSession, setuUserSession] = useState(getUser());
  // const userSession = getUser();

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const { logged } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // show nav components
  useEffect(() => {
    {
      console.log("Mode:", import.meta.env.VITE_MODE);
    }
    if (userSession == null) {
      // tambahkan semua kategori
      navigate("/login");
    }
    //   //this code else bellow won't works
    // else {
    //   setuUserSession(true);
    //   console.log("proceed navigate to /");
    //   navigate("/");
    // }
  }, [userSession]);
  return (
    <>
      {userSession !== null ? (
        <>
          <MyAppRoutes />
        </>
      ) : (
        <>
          <LoginRouter />
        </>
      )}
      <MyDebuggerPanel />
    </>
  );
}

export default App;
