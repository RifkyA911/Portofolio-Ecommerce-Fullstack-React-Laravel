import React from "react";
// Layout
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "../utils/Navigation";
import { getReactIconsBs } from "../utils/RenderIcons";

export const Content = (props) => {
  const { pageName } = props;
  // REDUX
  const { BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  dispatch(setCurrentSidebar(getCurrentEndpoint()));
  return (
    <>
      <div className="w-full h-full p-4">
        <div className="pages-title flex flex-row items-center justify-start text-xl font-roboto-medium mb-4 px-2">
          <h1>{pageName}</h1>
          <i className="px-2 text-md">
            {pageName == "Notifications" && getReactIconsBs("BsBellFill")}
          </i>
        </div>
        <div
          className={`${ContentBgColor} rounded-xl flex flex-col min-h-screen py-4 px-12 text-black`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Content;
