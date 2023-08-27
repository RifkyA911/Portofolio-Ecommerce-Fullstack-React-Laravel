import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist = [
        ...state.wishlist,
        {
          id: action.payload.id,
        },
      ];
    },
    removeFromWishlist: (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    },
    clearWishlist: () => {
      return { ...initialState };
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
