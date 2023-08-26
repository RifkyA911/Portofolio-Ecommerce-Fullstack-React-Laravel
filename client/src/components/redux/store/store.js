import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "../wishlistSlice";

const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
  },
});

export default store;
