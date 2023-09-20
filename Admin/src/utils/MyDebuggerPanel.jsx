import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "../Redux/Slices/UISlice";
import { navLink } from "../Redux/Slices/NavigationSlice";
import { logOutUser } from "./Session/Admin";

function MyDebuggerPanel() {
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
      <div className="relative min-w-screen z-[99999] bg-slate-500">
        <div className="fixed bottom-[0] left-1/2 -translate-x-1/2 ">
          {/*right-[50%] left-[50%]  */}
          <div className=" w-56 text-xs cursor-pointer backdrop-blur-sm bg-opacity-60 bg-white  rounded-md shadow-lg hover:font-semibold hover:bg-gray-300 duration-500">
            <div className="font-bold ">My Debugger Panel</div>
            {/* <small>@rifky911</small> */}
            <hr />
            {/* <input
          type="checkbox"
          className="toggle toggle-xs my-2"
          onClick={() => {
            dispatch(darkTheme());
          }}
        /> */}
            {/* <Summary a={2} b={5} /> 
        <br />*/}
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
