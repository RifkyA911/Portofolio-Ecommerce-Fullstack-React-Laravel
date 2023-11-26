import React, { useEffect, useState } from "react";

// Layout
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "../utils/Navigation";
import { MuiIcon, ReactIcons } from "../utils/RenderIcons";
import { sideNavigation } from "../Config/PagesLink";
// Config

export const Content = (props) => {
  const { pageName, Bg, children } = props;

  // REDUX
  const { BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );

  useEffect(() => {
    // Initialize pagesLink and pagesIcons arrays
    const pagesLink = [];
    const pagesIcons = [];

    sideNavigation.forEach((groupPage) => {
      groupPage.Links.forEach((page) => {
        pagesLink.push(page.name);
        pagesIcons.push(page.icon);
      });
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className="w-full h-full p-4 max-w-[1920px] mx-auto">
        <div className="pages-title flex flex-row items-center justify-start text-xl font-roboto-medium mb-3 px-2">
          {sideNavigation.flatMap((groupPage) =>
            groupPage.Links.map((page, index) => (
              <i key={page.name}>
                {page.name.toLowerCase() == pageName.toLowerCase() && (
                  <ReactIcons iconName={page.icon} />
                )}
              </i>
            ))
          )}
          <h1 className="ml-2 capitalize">{pageName}</h1>
        </div>
        <div className="div"></div>
        <div
          className={`${
            Bg == null ? ContentBgColor : Bg
          } rounded-xl flex flex-col min-h-screen py-2 lg:py-4 px-4 lg:px-4 text-black`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Content;
