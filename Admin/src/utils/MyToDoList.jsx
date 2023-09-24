import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMuiIcon } from "./RenderIcons.jsx";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "../Redux/Slices/UISlice";
import { navLink } from "../Redux/Slices/NavigationSlice";
import { logOutUser } from "./Session/Admin";

function MyToDoList() {
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
        <div className="fixed bottom-[-120px] right-0 hover:bottom-[0px] transition-all duration-300">
          <div className="w-10 h-8 bg-violet-200 hover:bg-violet-400 mx-auto cursor-pointer rounded-md hover:rotate-180 transition-all duration-300 m-0 p-0">
            <span className="w-full text-center m-0 px-0 py-2">
              {getMuiIcon("KeyboardDoubleArrowUp")}
            </span>
          </div>
          <div className="w-56 text-xs cursor-pointer backdrop-blur-sm bg-opacity-50 bg-white rounded-md shadow-lg hover:bg-white hover:bg-opacity-100 duration-500">
            <div className="font-bold ">My To Do List Panel</div>
            <hr />
            <div className="p-1">
              <ul className="list-disc  px-6 overflow-hidden truncate">
                <li>
                  <Link to="/products">Buat API Handler utk PUT Product</Link>
                </li>
                <li>???</li>
                <li>???</li>
                <li>???</li>
                <li>???</li>
                <li>???</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MyToDoList;
