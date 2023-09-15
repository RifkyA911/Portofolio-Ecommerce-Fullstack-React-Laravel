import { createSlice } from "@reduxjs/toolkit";

let toggleDark = true
export const UISlice = createSlice({
    name: "UI",
    initialState: {
        screenWidth: window.innerWidth,
        screenHeigth: window.innerHeight,
        BgColor: "bg-slate-100",
        ComponentColor: "bg-violet-200",
        textColor: "text-dark",
        // wideScreen: true,
        sidebarOpen: true,
        showNav: "",
        container: "app flex pt-14 min-h-screen max-w-full"
    },
    reducers: {
        changeBG : (state, action) => {
          state.BgColor = action.payload
        },
        changeText : (state, action) => {
          state.textColor = action.payload
        },
        darkTheme : (state) => {
          if(toggleDark){
            state.BgColor = "bg-gray-800"
            state.textColor = "text-white"
            toggleDark = !toggleDark
          } else {
            state.BgColor = "bg-slate-100"
            state.textColor = "text-dark"
            toggleDark = !toggleDark
          }
          console.log(toggleDark)
        },
        changeScreen: (state, action) => {
          window.addEventListener("resize", setWindowWidth(window.innerWidth));
           return () => {
              window.removeEventListener("resize", setWindowWidth(window.innerWidth));
            };
        },
        toggleSidebar: (state, action) => {
          if(action.payload!=null){
            console.log('aru')
            state.sidebarOpen = action.payload
          } else {
            console.log('inai')
            state.sidebarOpen = !state.sidebarOpen
            console.log(`state sidebar = ${state.sidebarOpen}, screen = ${state.wideScreen}`)
          }
        }
      }
})

// this is for dispatch
export const { changeBG, changeText, changeScreen, toggleSidebar, darkTheme } = UISlice.actions;
// this is for configureStore
export default UISlice.reducer;