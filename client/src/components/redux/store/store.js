import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "../wishlistSlice";
import cartSlice from "../cartSlice";

const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    cart: cartSlice,
  },
});

export default store;
