import { createSlice } from "@reduxjs/toolkit";

export const NavigationSlice = createSlice({
    name: "navigation",
    initialState: {
        showNav: true,
    },
    reducers:{
        navLink: (state, action) => {
            state.showNav = action.payload
            // console.log('navlink: ',state.showNav)
        }
    }
})

// this is for dispatch
export const { navLink } = NavigationSlice.actions;
// this is for configureStore
export default NavigationSlice.reducer;