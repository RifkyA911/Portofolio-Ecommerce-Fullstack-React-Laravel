import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MuiIcon } from "./RenderIcons.jsx";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "../Redux/Slices/UISlice";
import { navLink } from "../Redux/Slices/NavigationSlice";
import { logOutUser } from "./Session/Admin";

function MyToDoList() {
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
      <div className="relative min-w-screen z-[99999] bg-slate-500">
        <div className="fixed bottom-[-110px] right-0 hover:bottom-[0px] transition-all duration-300">
          <div className="w-56 text-xs cursor-pointer backdrop-blur-sm bg-opacity-50 bg-white rounded-md shadow-lg hover:bg-white hover:bg-opacity-100 duration-500">
            <div className="font-bold ">
              My To Do List Panel
              <button
                className="absolute hover:bg-red-500 bg-red-300 px-1 right-0 rounded-sm "
                onClick={() => setClose(!close)}
              >
                <div className="transition-all duration-200 hover:rotate-180">
                  X
                </div>
              </button>
            </div>
            <hr />
            <div className="p-1">
              <ul className="list-disc  px-6 overflow-hidden truncate">
                <li>
                  <Link to="/products">Buat API Handler utk PUT Product</Link>
                </li>
                <li>Search Table limited by pagination</li>
                <li>Error Filter Th after update Pagination</li>
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
