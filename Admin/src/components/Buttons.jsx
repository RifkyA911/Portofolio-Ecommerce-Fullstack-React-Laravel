import React, { useState } from "react";
import * as MuiIcons from "@mui/icons-material";
// import { Tesku } from "./Sidebar";

function SidebarButton(props) {
  const [Testing, setTesting] = useState(false);

  const TesToggleSidebar = () => {
    // return setTesting(!Testing);
    return "HAHA";
  };

  const TesSidebar = () => {
    // toggleSidebar(!Testing);
    console.log(props.TesSidebar);
    return <Tesku Toggle={TesToggleSidebar} />;
  };
  // Konten omponen
  return (
    <>
      {/* <button>{props.toggleSidebar}</button> */}
      <button
        className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200"
        onClick={TesSidebar}
      >
        <MuiIcons.Menu className="h-6 w-6 text-dark text-bold" />
      </button>
    </>
  );
}

// function WideScreenButton(props) {
//   return (
//     <>
//       <button className="toggler flex-shrink-0 p-2 rounded-xl text-gray-800 transition ease-in-out delay-150 bg-violet-200 hover:-translate-y-1 hover:scale-110 hover:bg-violet-300 duration-200">
//         <MuiIcons.Laptop className="h-6 w-6 text-dark text-bold" />
//       </button>
//     </>
//   );
// }

export default SidebarButton;
// export default { SidebarButton, WideScreenButton };
