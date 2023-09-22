import React from "react";
import { sideNavigation } from "../Config/PagesLink";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../Layout";

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
        <div className="flex flex-col">
          <div className="flex-row">.box</div>
          <div className="flex-row">.box</div>
          <div className="flex-row">.box</div>
          <div className="flex-row">.box</div>
        </div>
      </Container>
    </>
  );
}
export default Notification;
