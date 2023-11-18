import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MuiIcon } from "./RenderIcons";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, toggleSidebar } from "../Redux/Slices/UISlice";
import { navLink } from "../Redux/Slices/NavigationSlice";
import { logOutUser } from "./../Config/Session";

function MyJump() {
  const [close, setClose] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // Gantilah 300 dengan ketinggian yang Anda inginkan
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Konten komponen
  return (
    <>
      <div className="relative min-w-screen z-[999999] bg-slate-500">
        {/* {isVisible && ( */}
        <div
          onClick={scrollToTop}
          className={`fixed bottom-[50px] ${
            isVisible ? `right-0` : "right-[-40px]"
          } hover:right-0 transition-all duration-300`}
        >
          <div className="w-auto  p-4 hover:p-3 text-xs cursor-pointer backdrop-blur-md bg-opacity-10 bg-gradient-to-t from-indigo-400 to-violet-400 rounded-md shadow-lg hover:bg-white hover:bg-opacity-100 duration-500">
            <div className="font-bold ">
              <button className="back-to-top">
                <MuiIcon iconName="NorthRounded" />
              </button>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
}
export default MyJump;
