import { Fragment, useEffect, useRef, useState, React } from "react";
import { Link, Outlet } from "react-router-dom";
import * as MuiIcons from "@mui/icons-material";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, darkTheme } from "../Redux/Slices/UISlice";
// UTILS
import { getUser, logOutUser } from "../utils/Session/Admin";
import { NavbarComponent } from "../components/Navbar";

const Navbar = () => {
  // REDUX
  const { BgColor, textColor, screenWidth, ComponentColor } = useSelector(
    (state) => state.UI
  );
  const { showNav } = useSelector((state) => state.navigation);
  const dispatch = useDispatch();
  const userSession = getUser();

  return (
    <>
      {showNav ? (
        userSession ? (
          <>
            <nav
              className={
                BgColor +
                " transition-all duration-300 fixed w-full z-50 text-xs"
              }
            >
              <div className="flex justify-between max-h-16 h-full py-3 px-6">
                {/* right */}
                <div className="flex order-first items-center justify-between w-12 md:w-72 font-bold">
                  <Link to="/" className="flex items-center justify-between">
                    <img
                      src="src\assets\logo.png"
                      alt="logo"
                      className="h-14 w-14 p-2 hidden sm:flex text-center"
                    />
                    <div className={textColor + ` text-lg hidden sm:flex pl-3`}>
                      <span>Admin Panel</span>
                    </div>
                  </Link>
                  <button
                    className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200"
                    onClick={() => dispatch(toggleSidebar())}
                  >
                    <MuiIcons.Menu className="h-6 w-6 text-dark text-bold" />
                  </button>
                </div>
                {/* Menu at left */}
                <div className="flex order-last items-center w-72 justify-end">
                  <NavbarComponent />
                </div>
              </div>
            </nav>
          </>
        ) : (
          <>
            <p>No Data user</p>
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
