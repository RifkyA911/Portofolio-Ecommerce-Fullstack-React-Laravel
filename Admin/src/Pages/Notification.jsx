import React from "react";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "./../utils/Navigation";
import { getReactIconsBs } from "../utils/RenderIcons";

function Notification() {
  // REDUX
  const { BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  // dispatch(setCurrentSidebar(getCurrentEndpoint()));
  // const allowedPaths = sideNavigation.reduce((accumulator, group) => {
  //   const groupLinks = group.Links.filter((link) => link.href);
  //   return accumulator.concat(groupLinks.map((link) => link.href));
  // }, []);
  // // Menampilkan hasilnya
  // console.log(allowedPaths);
  // useEffect(() => {}, []);
  // Konten komponen
  return (
    <>
      <Container>
        <Content pageName={"Notifications"}>
          <div className={`notifications-header flex flex-col`}>
            <div
              className={`${textColor} flex flex-row my-2 w-full justify-end`}
            >
              <div className="flex flex-col text-[14px] font-roboto-medium items-end">
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
                  className={`bg-slate-200 text-black shadow-md p-2 rounded-md cursor-pointer`}
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

          <div className="notifications-list">
            <div className="flex-row ">
              <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-50 shadow-sm h-14 rounded-sm border-l-8 border-sky-500 my-2">
                .box
              </div>
            </div>
            <div className="flex-row">
              <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-50 shadow-sm h-14 rounded-sm border-l-8 border-red-400 my-2">
                .box
              </div>
            </div>
            <div className="flex-row">
              <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-50 shadow-sm h-14 rounded-sm border-l-8 border-green-500 my-2">
                .box
              </div>
            </div>
            <div className="flex-row">
              <div className="flex flex-col w-full line-clamp-4 overflow-hidden bg-slate-50 shadow-sm h-14 rounded-sm border-l-8 border-yellow-400 my-2">
                .box
              </div>
            </div>
          </div>
          <div className="divider my-0"></div>
        </Content>
      </Container>
    </>
  );
}
export default Notification;
