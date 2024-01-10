import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Footer() {
  // REDUX
  const { BgColor, textColor, transitionColor } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  return (
    <>
      <footer
        className={`${BgColor} ${textColor} ${transitionColor} footer footer-center p-2 backdrop-blur-sm bg-opacity-90 text-xs`}
      >
        <aside>
          <p>Copyright © 2024 - All right reserved by @RifkyA911</p>
        </aside>
      </footer>
    </>
  );
}
export default Footer;
