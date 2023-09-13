import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
    name: "UI",
    initialState: {
        BgColor: "bg-slate-200",
        textColor: "bg-black-500",
        wideScreen: "lg:ml-64",
        sidebarOpen: "",
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
          state.wideScreen = action.payload
        }
      }
})

// this is for dispatch
export const { changeBG, changeText } = UISlice.actions;
// this is for configureStore
export default UISlice.reducer;