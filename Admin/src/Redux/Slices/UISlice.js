import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../Config/Cookies";

// let toggleDark = true;

const userCookies = JSON.parse(getCookie("user_settings"));

let toggleDark = userCookies?.user.settings?.theme == "light" ? false : true;

function isDark() {
  return userCookies?.settings?.theme == "dark" ? true : false;
}

function isSidebarOpen() {
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
    DarkMode: isDark() ? true : false,
    BgColor: isDark() ? "bg-gray-800" : "bg-white",
    BackBgColor: isDark() ? "bg-gray-800" : "bg-white",
    container: "app flex pt-14 min-h-screen max-w-full",
    ContainerBgColor: isDark() ? "bg-gray-700" : "bg-slate-100",
    ContentBgColor: isDark() ? "bg-gray-800" : "bg-white",
    ComponentColor: isDark() ? "bg-violet-300" : "bg-violet-200",
    textColor: isDark() ? "text-white" : "text-dark",
    // nav
    currentClicked: "Dashboard",
    transitionColor: "transition-all duration-300",
    wideScreen: true,
    sidebarOpen: isSidebarOpen(),
    showNav: "",
    // table
    textTable: isDark() ? "text-gray-300" : "text-gray-600",
    BgTable: isDark() ? "bg-white" : "bg-white",
    BgOuterTable: isDark() ? "bg-gray-700" : "bg-slate-200",
    BorderOuterTable: isDark()
      ? "border-[1px] border-gray-800"
      : "border-[1px] border-gray-300",
    BorderRowTable: isDark()
      ? "border-b-2 border-gray-600"
      : "border-b-2 border-gray-200",
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
