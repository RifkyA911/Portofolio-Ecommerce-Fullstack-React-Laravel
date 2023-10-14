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

  const appMode = import.meta.env.MODE;
  // console.info("Mode:", import.meta.env);
  // console.log(location);
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjk3MTg4MzU5LCJleHAiOjE2OTcxOTE5NTksIm5iZiI6MTY5NzE4ODM1OSwianRpIjoiWEE3eTR5N1FhM0E5WVRLRSIsInN1YiI6IjEiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.WjAHEtv1iKMfET3NUbaVYzSFDzRCOEFC8SiKFRmS0uE";
  // console.log(jwt.verify(token, import.meta.env.VITE_JWT_SECRET));

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
      {appMode == "development" ? (
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
