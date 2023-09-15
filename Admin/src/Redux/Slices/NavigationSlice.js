import { createSlice } from "@reduxjs/toolkit";

export const NavigationSlice = createSlice({
    name: "navigation",
    initialState: {
        showNav: true,
    },
    reducers:{
        navLink: (state, action) => {
            console.log(showNav)
        }
    }
})

// this is for dispatch
export const { navLink } = NavigationSlice.actions;
// this is for configureStore
export default NavigationSlice.reducer;