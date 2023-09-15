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
// Container
// import Container from "./layout/container";

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
  const [user, setUser] = useState(getUser());

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // show nav components
  useEffect(() => {
    if (!user) {
      handleLogin();
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
  }, [location]);

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      {/* {!user ? (
        <>
        </>
      ) : (
        <>
          <Login />
        </>
      )} */}
      <MyAppRoutes />
      <MyDebuggerPanel />
    </>
  );
}

export default App;
