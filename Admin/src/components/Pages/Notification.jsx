import React from "react";
import { sideNavigation } from "../Data/PagesLink";
// REDUX
import { useDispatch, useSelector } from "react-redux";

function Notification() {
  // REDUX
  const { BgColor, textColor, screenWidth, sidebarOpen } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  // Konten komponen
  return (
    <>
      <p>notification</p>
      <div>
        {sideNavigation.map((group) => (
          <div key={group.GroupID}>
            <h3
              className={
                textColor +
                `h-12 ml-0 px-6 py-2 flex items-center justify-left font-sm`
              }
            >
              {group.GroupName}
            </h3>
            <ul>
              {group.Links.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Isi komponen */}
    </>
  );
}
export default Notification;
