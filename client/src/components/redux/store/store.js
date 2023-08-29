import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "../wishlistSlice";
import cartSlice from "../cartSlice";
import productSlice from "../productSlice";

const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    cart: cartSlice,
    products: productSlice,
  },
});

export default store;
