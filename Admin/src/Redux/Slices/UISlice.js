import { createSlice } from "@reduxjs/toolkit";

let toggleDark = true;

function checkScreenWidth(params) {
  if (window.innerWidth < 1024) {
    return false;
  } else {
    return true;
  }
}
export const UISlice = createSlice({
  name: "UI",
  initialState: {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    // main
    DarkMode: false,
    BgColor: "bg-white",
    BackBgColor: "bg-white",
    container: "app flex pt-14 min-h-screen max-w-full",
    ContainerBgColor: "bg-slate-100",
    ContentBgColor: "bg-white",
    ComponentColor: "bg-violet-200",
    textColor: "text-dark",
    // nav
    currentClicked: "Dashboard",
    transitionColor: "transition-all duration-300",
    wideScreen: true,
    sidebarOpen: checkScreenWidth(),
    showNav: "",
    // table
    textTable: "text-gray-600",
    BgTable: "bg-white",
    BgOuterTable: "bg-slate-200",
    BorderOuterTable: "border-[1px] border-gray-300",
    BorderRowTable: "border-b-2 border-gray-200",
    // form
    BgErrorInput: "bg-white",
  },
  reducers: {
    changeBG: (state, action) => {
      state.BgColor = action.payload;
    },
    changeText: (state, action) => {
      state.textColor = action.payload;
    },
    darkTheme: (state) => {
      if (toggleDark) {
        state.DarkMode = true;
        (state.BgColor = "bg-gray-800"),
          (state.BackBgColor = "bg-gray-800"),
          (state.textColor = "text-white"),
          (state.ContainerBgColor = "bg-gray-700"),
          (state.ContentBgColor = "bg-gray-800"),
          // table
          (state.BgTable = "bg-white"),
          (state.BgOuterTable = "bg-gray-700"),
          (state.BorderOuterTable = "border-[1px] border-gray-800"),
          (state.BorderRowTable = "border-b-2 border-gray-600"),
          //form
          (state.BgErrorInput = "bg-white"),
          // toggler
          (toggleDark = !toggleDark);
      } else {
        state.DarkMode = false;
        (state.BgColor = "bg-white"),
          (state.textColor = "text-dark"),
          (state.BackBgColor = "bg-white"),
          (state.ContainerBgColor = "bg-slate-100"),
          (state.ContentBgColor = "bg-white"),
          // table
          (state.BgTable = "bg-white"),
          (state.BgOuterTable = "bg-slate-200"),
          (state.BorderOuterTable = "border-[1px] border-gray-300"),
          (state.BorderRowTable = "border-b-2 border-gray-200"),
          //form
          (state.BgErrorInput = "bg-white"),
          // toggler
          (toggleDark = !toggleDark);
      }
      console.log("Dark Mode:", toggleDark);
    },
    refreshScreen: (state, action) => {
      // console.log(action);
      state.screenWidth = action.payload.screenWidth;
      state.screenHeight = action.payload.screenHeight;
    },
    toggleSidebar: (state, action) => {
      if (action.payload != null) {
        console.log("Sidebar Open");
        state.sidebarOpen = action.payload;
      } else {
        console.log("Sidebar Close");
        state.sidebarOpen = !state.sidebarOpen;
      }
    },
    setCurrent: (state, action) => {
      state.currentClicked = action.payload;
      console.log(state.currentClicked);
    },
  },
});

// this is for dispatch
export const {
  changeBG,
  refreshScreen,
  changeText,
  changeScreen,
  toggleSidebar,
  darkTheme,
  setCurrent,
} = UISlice.actions;
// this is for configureStore
export default UISlice.reducer;
