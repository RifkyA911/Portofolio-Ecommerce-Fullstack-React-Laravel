import { createSlice } from "@reduxjs/toolkit";
export const RefreshSlice = createSlice({
  name: "Refresh",
  initialState: {
    refreshToken: false,
  },
  reducers: {
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

// this is for dispatch
export const { refreshToken } = RefreshSlice.actions;
// this is for configureStore
export default RefreshSlice.reducer;
