import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Navbar, Sidebar, NotFound, Login } from "./components"; // ./components/index.jsx
// Container
// import Container from "./layout/container";

//import dummy data
import { sideNavigation } from "./components/Data/oldPagesLink";

// import UI Component
import "./App.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "./Redux/Slices/UISlice";
import Summary from "./utils/Summary";
import { Dashboard } from "@mui/icons-material";

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

function App() {
  // login component
  const [user, setUser] = useState(getUser());
  // navigation state
  const [sidebarOpen, setSidebarOpen] = useState();
  const [wideScreen, setWideScreen] = useState("lg:ml-64");
  const [showNav, setShowNav] = useState();

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // show nav components
  useEffect(() => {
    // Hide Sidebar and Nav when access wrong url
    const allowedPaths = sideNavigation.map((item) => item.href); // link navigation from data PagesLink

    if (allowedPaths.includes(location.pathname)) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }

    // auto toggleSidebar if screen size based on devices like smartphone or pc
    if (window.innerWidth < 1024) {
      dispatch(toggleSidebar(false));
    } else {
      dispatch(toggleSidebar(true));
    }
  }, [location]);

  return (
    <>
      {/* {!user ? (
      ) : ()} */}
      <>
        <Navbar showNav={showNav} />
        <Sidebar showNav={showNav} sidebarOpen={sidebarOpen} />
        <div className="app flex pt-14 min-h-screen max-w-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Container selectedPage="dashboard" />} />
            <Route
              path="/admins"
              element={<Container selectedPage="admins" />}
            />
            <Route path="/inbox" element={<Container selectedPage="inbox" />} />
            <Route
              path="/notification"
              element={<Container selectedPage="notification" />}
            />
            <Route
              path="/settings"
              element={<Container selectedPage="settings" />}
            />
            <Route
              path="/statistic"
              element={<Container selectedPage="statistic" />}
            />
            <Route
              path="/myprofile"
              element={<Container selectedPage="myprofile" />}
            />
            <Route
              path="/products"
              element={<Container selectedPage="products" />}
            />
            <Route
              path="/warehouse"
              element={<Container selectedPage="warehouse" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* ============================================================================================= */}
        <div className="text-xs cursor-pointer backdrop-blur-sm bg-opacity-60 bg-white w-60 fixed left-2/4 bottom-0 z-50 rounded-xl shadow-lg hover:font-semibold hover:bg-gray-300 duration-200">
          <input
            type="checkbox"
            className="toggle"
            onClick={() => {
              dispatch(darkTheme());
            }}
          />
          <Summary a={2} b={5} />
          <br />
          <button>Theme : {BgColor}</button>
          <hr />
          <Link to="/x">
            <div className="flex-row p-2">
              <div className="flex flex-col ">
                <div className="font-bold">Debugger Panel</div>
              </div>
              <div>
                Width: {screenWidth} Height: {screenHeigth}
              </div>
            </div>
          </Link>
        </div>
      </>
    </>
  );
}

export default App;
