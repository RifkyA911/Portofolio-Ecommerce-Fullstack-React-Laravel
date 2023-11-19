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
import { getUser } from "./Config/Session";
import LoginRouter from "./Config/LoginRouter";
import MyJump from "./utils/MyJump";
import {
  clearSession,
  updateCredentials,
  updateSession,
} from "./Redux/Slices/UserSlice";
import { IsScreenResize } from "./utils/Solver";
import { getApiUrl } from "./Config/API";
// import Summary from "./utils/Summary";

function App() {
  // login component
  const [userSession, setUserSession] = useState(getUser()); // need to change

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const { logged, user } = useSelector((state) => state.user);
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appMode = import.meta.env.MODE;

  useEffect(() => {
    if (userSession == null) {
      navigate("/login");
      dispatch(clearSession());
    } else {
      dispatch(updateCredentials({ user: getUser() }));
    }
    console.log(getApiUrl("products"));
    // console.log(`logged:`, logged);
    // console.log(`userSession:`, userSession);
    // console.log(`user:`, getUser());
    // setUserSession(getUser())
  }, [userSession, user]);
  return (
    <>
      {userSession !== null ? (
        <>
          {logged && (
            <>
              <MyAppRoutes />
            </>
          )}
        </>
      ) : (
        <>
          <LoginRouter />
        </>
      )}
      <IsScreenResize monitoring={false} />
      {/* Developer Panel */}
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
