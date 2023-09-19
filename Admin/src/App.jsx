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
import { allowedPaths } from "./utils/ShowNavigation";
// Pages
import { NotFound, Login } from "./Pages";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "./Redux/Slices/UISlice";
import { navLink } from "./Redux/Slices/NavigationSlice";

// Utils
import MyAppRoutes from "./Config/MyAppRoutes";
import MyDebuggerPanel from "./utils/MyDebuggerPanel";
import { getUser } from "./utils/Session/Admin";
// import Summary from "./utils/Summary";

function App() {
  // login component
  const [userSession, setuUserSession] = useState(getUser());
  // const userSession = getUser();

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // show nav components
  useEffect(() => {
    if (userSession == null) {
      navigate("/login");
    }
    {
      navigate("/");
    }
    // console.log(location);
    if (allowedPaths.includes(location.pathname)) {
      dispatch(navLink(true));
    } else {
      dispatch(navLink(false));
    }

    // auto toggleSidebar if screen size based on devices like smartphone or pc
    if (screenWidth < 1024) {
      dispatch(toggleSidebar(false));
    } else {
      dispatch(toggleSidebar(true));
    }
    console.log(userSession);
  }, [userSession]);
  return (
    <>
      {userSession !== null ? (
        <>
          <p>Gaga</p>
          {/* <MyAppRoutes />
          <MyDebuggerPanel /> */}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;
