import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isOnCart = state.cart.find((item) => item.id === action.payload.id);
      if (isOnCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  qty: item.qty + action.payload.qty,
                }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    },
    clearCart: () => {
      return { ...initialState };
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
