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

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { navLink } from "./Redux/Slices/NavigationSlice";

// Utils
import MyAppRoutes from "./Config/MyAppRoutes";
import { getUser } from "./utils/Session/Admin";
import LoginRouter from "./Config/LoginRouter";
import MyJump from "./utils/MyJump";
import MyDebuggerPanel from "./utils/MyDebuggerPanel";
import MyToDoList from "./utils/MyToDoList";
// import Summary from "./utils/Summary";

function App() {
  // login component
  const [userSession, setuUserSession] = useState(getUser());

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const { logged } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appMode = import.meta.env.VITE_MODE;
  // console.info("Mode:", appMode);

  useEffect(() => {
    if (userSession == null) {
      // tambahkan semua kategori
      navigate("/login");
    }
    //   //this code else bellow won't works if you at /login
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
      {/* Developer Panel */}
      {appMode == "DEVELOPMENT" ? (
        <>
          <MyDebuggerPanel />
          <MyToDoList />
          <MyJump />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
