import { createSlice } from "@reduxjs/toolkit";

export const NavigationSlice = createSlice({
    name: "navigation",
    initialState: {
        showNav: true,
        currentLocation: 'Dashboard',
    },
    reducers:{
        navLink: (state, action) => {
            state.showNav = action.payload
        },
        setCurrentSidebar: (state, action) => {
            state.currentLocation = action.payload
        }
    }
})

// this is for dispatch
export const { navLink, setCurrentSidebar } = NavigationSlice.actions;
// this is for configureStore
export default NavigationSlice.reducer;