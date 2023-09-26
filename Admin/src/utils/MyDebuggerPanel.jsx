import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "../Redux/Slices/UISlice";
import { navLink } from "../Redux/Slices/NavigationSlice";
import { logOutUser } from "./Session/Admin";
import { MuiIcon } from "./RenderIcons";

function MyDebuggerPanel() {
  const [close, setClose] = useState(false);
  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Konten komponen
  return (
    <>
      <div
        className={`${
          close ? "hidden" : "block"
        } relative min-w-screen z-[99999] bg-slate-500`}
      >
        <div className="fixed bottom-[-50px] hover:bottom-[0px] left-1/2 -translate-x-1/2 transition-all duration-300">
          {/*right-[50%] left-[50%]  */}
          <div className=" w-56 text-xs cursor-pointer backdrop-blur-sm bg-opacity-60 bg-white rounded-md shadow-lg hover:font-semibold duration-500">
            <div className="relative font-bold ">
              My Debugger Panel{" "}
              <button
                className="absolute hover:bg-red-500 bg-red-300 px-1 right-0 rounded-sm "
                onClick={() => setClose(!close)}
              >
                <div className="transition-all duration-200 hover:rotate-180">
                  X
                </div>
              </button>
            </div>
            <div className="p-1">
              <Link to="/x">Theme : {BgColor}</Link>
              <div>
                <div className="flex-row">
                  <div className="flex flex-col "></div>
                  <div>
                    Width: {screenWidth} Height: {screenHeigth}
                  </div>
                </div>
              </div>
              <a
                href="/logout"
                onClick={logOutUser}
                className="bg-lime-500 rounded-md px-4"
              >
                Clear Session Data
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MyDebuggerPanel;
