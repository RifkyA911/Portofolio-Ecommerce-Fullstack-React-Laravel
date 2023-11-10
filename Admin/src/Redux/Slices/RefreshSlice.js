import { createSlice } from "@reduxjs/toolkit";
export const RefreshSlice = createSlice({
  name: "Refresh",
  initialState: {
    refreshToken: false,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  },
  reducers: {
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    refreshScreen: (state, action) => {
      // console.log(action);
      state.screenWidth = action.payload.screenWidth;
      state.screenHeight = action.payload.screenHeight;
    },
  },
});

// this is for dispatch
export const { refreshToken, refreshScreen } = RefreshSlice.actions;
// this is for configureStore
export default RefreshSlice.reducer;
