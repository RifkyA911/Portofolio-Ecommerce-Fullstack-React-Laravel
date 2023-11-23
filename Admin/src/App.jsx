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
import { getAccessToken, getCookie, getUser } from "./Config/Session";
import LoginRouter from "./Config/LoginRouter";
import MyJump from "./utils/MyJump";
import { clearSession, updateCredentials } from "./Redux/Slices/UserSlice";
import { IsScreenResize } from "./utils/Solver";
import RequestAPI, { getApiUrl } from "./Config/API";
// import Summary from "./utils/Summary";

const appMode = import.meta.env.MODE;

function App() {
  // login component
  // const [fetch, setFetch] = useState(false); // need to change
  const [token, setToken] = useState(getCookie("token"));

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const { logged, user } = useSelector((state) => state.user);
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/login");
      dispatch(clearSession());
    }
    // else {
    //   // navigate("/");
    //   console.log("token", token ? true : false, "| logged", logged);
    // }
    // console.log(getApiUrl("products"));
    // console.log(`logged:`, logged);
    // console.log(`token:`, token);
    // console.log(`user:`, getUser());
  }, [token]);

  return (
    <>
      {token !== null ? (
        <>
          {/* {logged && ( */}
          <>
            <MyAppRoutes />
          </>
          {/* )} */}
        </>
      ) : (
        <>
          <LoginRouter />
        </>
      )}
      <IsScreenResize monitoring={false} />
      {/* ------- Developer Panel ------- */}
      {appMode == "development" && (
        <>
          {/* <MyDebuggerPanel /> */}
          {/* <MyToDoList /> */}
          <MyJump />
        </>
      )}
    </>
  );
}

export default App;
