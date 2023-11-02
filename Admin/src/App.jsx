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
import {
  clearSession,
  updateCredentials,
  updateSession,
} from "./Redux/Slices/UserSlice";
// import Summary from "./utils/Summary";

function App() {
  // login component
  const [userSession, setUserSession] = useState(getUser()); // need to change

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const { logged, user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appMode = import.meta.env.MODE;
  // console.info("Mode:", import.meta.env);
  // console.log(location);

  useEffect(() => {
    if (userSession == null) {
      navigate("/login");
      dispatch(clearSession());
    } else {
      dispatch(updateCredentials({ user: getUser() }));
    }
    // console.log(`logged:`, logged);
    // console.log(`userSession:`, userSession);
    // console.log(`user:`, user);
    // setUserSession(getUser())
    // console.log(user);
  }, [userSession]);
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
