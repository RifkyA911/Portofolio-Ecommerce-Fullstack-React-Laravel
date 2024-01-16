import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Config
// Layout
import { Container, Content } from "../Layout"; // ./components/index.jsx
// Components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
// Utils
import { validateAccessToken } from "../Config/Session.jsx";

import {
  DashboardFirstSection,
  DashboardSecondSection,
} from "../components/Dashboard/DashboardParts.jsx";

const Dashboard = (props) => {
  // REDUX
  const {
    DarkMode,
    container,
    BgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

  return (
    <>
      <button
        className="bg-red-300 absolute left-1/2 top-12 z-[99]"
        onClick={() => validateAccessToken()}
      >
        Check Token
      </button>

      <Container>
        <Content pageName="Dashboard" Bg={`${container}`}>
          <div className="">
            {/* line-header */}
            <DashboardHeader />
            <div className="my-4"></div>
            {/* line-2 */}
            <div className="flex lg:max-h-[900px]">
              <div className="flex flex-col lg:flex-row w-full py-2 h-20 lg:h-[450px] overflow-clip">
                <DashboardFirstSection />
              </div>
            </div>
            {/* line-3 */}
            <div className="flex lg:max-h-[900px]">
              <div className="flex flex-col lg:flex-row w-full ">
                <DashboardSecondSection />
              </div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};
export default Dashboard;
