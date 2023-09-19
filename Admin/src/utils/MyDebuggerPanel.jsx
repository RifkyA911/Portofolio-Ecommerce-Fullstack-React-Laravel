import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "../Redux/Slices/UISlice";
import { navLink } from "../Redux/Slices/NavigationSlice";

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
      <div className="text-xs cursor-pointer backdrop-blur-sm bg-opacity-60 bg-white w-60 fixed left-2/4 bottom-0 z-50 rounded-xl shadow-lg hover:font-semibold hover:bg-gray-300 duration-200">
        <div className="font-bold ">Debugger Panel</div>
        <hr />
        {/* <input
          type="checkbox"
          className="toggle toggle-xs my-2"
          onClick={() => {
            dispatch(darkTheme());
          }}
        /> */}
        {/* <Summary a={2} b={5} /> */}
        <br />
        <button>Theme : {BgColor}</button>
        <Link to="/x">
          <div className="flex-row p-2">
            <div className="flex flex-col "></div>
            <div>
              Width: {screenWidth} Height: {screenHeigth}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default MyDebuggerPanel;
