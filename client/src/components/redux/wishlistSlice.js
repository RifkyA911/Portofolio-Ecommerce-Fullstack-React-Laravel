import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist = [
        ...state.wishlist,
        {
          id: action.payload.id,
        },
      ];
    },
  },
});

export const { setWishlist, addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
