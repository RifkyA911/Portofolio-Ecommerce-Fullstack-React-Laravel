import React, { useEffect, useState } from "react";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "./../utils/Navigation";
import { MarketInbox } from "./../Config/Temporary.js";
function Notification() {
  // Table Body
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // REDUX
  const { BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Content pageName={"Notifications"}>
          <div className="notifications">
            <div className={`notifications-header flex flex-col`}>
              <div
                className={`${textColor} flex flex-row mb-2 w-full justify-end`}
              >
                <div className="flex flex-col text-[14px] font-roboto-medium items-end text-xs">
                  <label
                    htmlFor="date"
                    className="pb-2 cursor-pointer text-xs font-roboto-regular"
                  >
                    Pick Date History
                  </label>
                  <input
                    id="date"
                    type="date"
                    name=""
                    placeholder="dd"
                    autoFocus
                    className={`bg-slate-200 text-black shadow-md py-1 px-2 rounded-md cursor-pointer outline-none`}
                  />
                </div>
              </div>
              <div
                className={`${textColor} flex flex-row my-2 w-full justify-between`}
              >
                <div className="text-xl font-roboto-regular inline-flex items-center">
                  <span>Today</span>{" "}
                </div>
              </div>
            </div>

            <div className="notifications-list px-8">
              <div className="flex-row ">
                <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-100 shadow-sm h-14 rounded-sm border-l-8 border-sky-500 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-100 shadow-sm h-14 rounded-sm border-l-8 border-red-400 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-100 shadow-sm h-14 rounded-sm border-l-8 border-green-500 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-100 shadow-sm h-14 rounded-sm border-l-8 border-yellow-400 my-2">
                  .box
                </div>
              </div>
              <div className="divider my-0"></div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
}
export default Notification;
