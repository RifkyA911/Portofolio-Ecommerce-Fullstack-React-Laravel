import React from "react";
// Layout
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "../utils/Navigation";
import { MuiIcon, getReactIconsBs } from "../utils/RenderIcons";

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
      <div className="w-full h-full p-4 max-w-[1920px] mx-auto">
        <div className="pages-title flex flex-row items-center justify-start text-xl font-roboto-medium mb-3 px-2">
          <h1>{pageName}</h1>
          <i className="px-2 text-md">
            {pageName == "Notifications" && getReactIconsBs("BsBellFill")}
            {pageName == "Admins" && (
              <MuiIcon iconName={"PeopleAlt"} fontSize={24} />
            )}
          </i>
        </div>
        <div
          className={`${ContentBgColor} rounded-xl flex flex-col min-h-screen py-2 lg:py-4 px-4 lg:px-4 text-black`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Content;
