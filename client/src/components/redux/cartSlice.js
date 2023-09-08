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
                  qty: item.qty + 1,
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
    decreaseCartQty: (state, action) => {
      const isOnCart = state.cart.find((item) => item.id === action.payload.id);
      if (isOnCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  qty: item.qty - 1,
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
    clearCart: () => {
      return { ...initialState };
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseCartQty } =
  cartSlice.actions;
export default cartSlice.reducer;
