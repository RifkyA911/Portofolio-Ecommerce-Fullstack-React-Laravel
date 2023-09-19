import { createSlice } from "@reduxjs/toolkit";

let toggleDark = true
export const UISlice = createSlice({
    name: "UI",
    initialState: {
        screenWidth: window.innerWidth,
        screenHeigth: window.innerHeight,
        DarkMode: false,
        BgColor: "bg-white",
        BackBgColor: "bg-white",
        ContainerBgColor: "bg-slate-100",
        ComponentColor: "bg-violet-200",
        textColor: "text-dark",
        currentClicked: "Dashboard",
        transitionColor: "transition-all duration-300",
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
            state.DarkMode = true
            state.BgColor = "bg-gray-800",
            state.textColor = "text-white",
            state.BackBgColor = "bg-gray-700",
            state.ContainerBgColor = "bg-slate-800",
            toggleDark = !toggleDark
          } else {
            state.DarkMode = false
            state.BgColor = "bg-white",
            state.textColor = "text-dark",
            state.BackBgColor = "bg-white",
            state.ContainerBgColor = "bg-slate-200",
            toggleDark = !toggleDark
          }
          console.log("Dark Mode:", toggleDark)
        },
        // changeScreen: (state, action) => {
        //   window.addEventListener("resize", setWindowWidth(window.innerWidth));
        //    return () => {
        //       window.removeEventListener("resize", setWindowWidth(window.innerWidth));
        //     };
        // },
        toggleSidebar: (state, action) => {
          if(action.payload!=null){
            console.log('Sidebar Open')
            state.sidebarOpen = action.payload
          } else {
            console.log('Sidebar Close')
            state.sidebarOpen = !state.sidebarOpen
            console.log(`state sidebar = ${state.sidebarOpen}, screen = ${state.wideScreen}`)
          }
        }, 
        setCurrent: (state, action)=> {
          state.currentClicked = action.payload
          console.log(state.currentClicked)
        }
      }
})

// this is for dispatch
export const { changeBG, changeText, changeScreen, toggleSidebar, darkTheme, setCurrent } = UISlice.actions;
// this is for configureStore
export default UISlice.reducer;