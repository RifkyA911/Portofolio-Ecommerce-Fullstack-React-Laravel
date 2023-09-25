import React from "react";
// Layout
import { Container } from "../Layout";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "./../utils/Navigation";

function Notification() {
  // REDUX
  const { BgColor, textColor, screenWidth, sidebarOpen } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  dispatch(setCurrentSidebar(getCurrentEndpoint()));
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
        <div className="w-full h-full p-4">
          <div
            className={`${BgColor} rounded-xl flex flex-col min-h-screen p-4 text-black`}
          >
            <div className={`notifications-header flex flex-col`}>
              <div className="flex flex-row my-2 w-full lg:justify-end">
                <div className="text-lg font-roboto-medium">Today</div>
                <div className="text-lg font-roboto-medium">Today</div>
              </div>
              <div className="flex flex-row my-2 w-full justify-between ">
                <div className="text-lg font-roboto-medium">Today</div>
                <div className="text-lg font-roboto-medium">Today</div>
              </div>
            </div>

            <div className="notifications-list">
              <div className="flex-row ">
                <div className="flex flex-col w-full overflow-hidden bg-slate-50 shadow-sm h-16 rounded-sm border-l-8 border-sky-500 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full overflow-hidden bg-slate-50 shadow-sm h-16 rounded-sm border-l-8 border-red-400 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full overflow-hidden bg-slate-50 shadow-sm h-16 rounded-sm border-l-8 border-green-500 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full overflow-hidden bg-slate-50 shadow-sm h-16 rounded-sm border-l-8 border-yellow-400 my-2">
                  .box
                </div>
              </div>
              <div className="flex-row">
                <div className="flex flex-col w-full overflow-hidden bg-slate-50 shadow-sm h-16 rounded-sm border-l-8 border-indigo-400 my-2">
                  .box
                </div>
              </div>
            </div>
            <div className="divider my-0"></div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default Notification;
