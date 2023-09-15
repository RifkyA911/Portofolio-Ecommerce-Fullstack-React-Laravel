import React from "react";
import { sideNavigation } from "../Config/PagesLink";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import Container from "../layout/Container";

function Notification() {
  // REDUX
  const { BgColor, textColor, screenWidth, sidebarOpen } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  // const allowedPaths = sideNavigation.reduce((accumulator, group) => {
  //   const groupLinks = group.Links.filter((link) => link.href);
  //   return accumulator.concat(groupLinks.map((link) => link.href));
  // }, []);
  // // Menampilkan hasilnya
  // console.log(allowedPaths);
  // Konten komponen
  return (
    <>
      <Container>
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
      </Container>
    </>
  );
}
export default Notification;
