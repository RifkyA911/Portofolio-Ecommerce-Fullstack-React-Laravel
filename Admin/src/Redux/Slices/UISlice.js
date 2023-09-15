import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
    name: "UI",
    initialState: {
        screenWidth: window.innerWidth,
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
        changeScreen: (state, action) => {
        },
        toggleSidebar: (state) => {
          state.sidebarOpen = !state.sidebarOpen
          console.log(`state sidebar = ${state.sidebarOpen}, screen = ${state.wideScreen}`)
        }
      }
})

// this is for dispatch
export const { changeBG, changeText, toggleSidebar } = UISlice.actions;
// this is for configureStore
export default UISlice.reducer;