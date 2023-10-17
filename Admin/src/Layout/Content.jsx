import React from "react";

// Layout
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "../utils/Navigation";
import { MuiIcon, IconsBs } from "../utils/RenderIcons";
// Config

export const Content = (props) => {
  const { pageName, Bg } = props;

  // REDUX
  const { BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  // dispatch(setCurrentSidebar(getCurrentEndpoint()));
  return (
    <>
      <div className="w-full h-full p-4 max-w-[1920px] mx-auto">
        <div className="pages-title flex flex-row items-end justify-start text-xl font-roboto-medium mb-3 px-2">
          <i className="pr-2 text-md">
            {pageName == "Dashboard" && <MuiIcon iconName={"Home"} />}
            {pageName == "Notifications" && <IconsBs iconName="BsBellFill" />}
            {pageName == "Statistic" && <MuiIcon iconName={"BarChart"} />}
            {pageName == "Chat" && <MuiIcon iconName={"Sms"} />}
            {pageName == "Products" && <MuiIcon iconName={"Store"} />}
            {pageName == "Orders" && <MuiIcon iconName={"LocalShipping"} />}
            {pageName == "Invoices" && <MuiIcon iconName={"ReceiptLong"} />}
            {pageName == "Admins" && <MuiIcon iconName={"PeopleAlt"} />}
            {pageName == "My Profile" && (
              <MuiIcon iconName={"ManageAccounts"} />
            )}
            {pageName == "Settings" && <MuiIcon iconName={"Settings"} />}
          </i>
          <h1>{pageName}</h1>
        </div>
        <div className="div"></div>
        <div
          className={`${
            Bg == null ? ContentBgColor : Bg
          } rounded-xl flex flex-col min-h-screen py-2 lg:py-4 px-4 lg:px-4 text-black`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Content;
