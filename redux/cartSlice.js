import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
    tax: 0,
    cartTotal: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.cartTotal += 1;
      state.totalPrice += action.payload.price * action.payload.quantity;
      state.tax = state.totalPrice * (0.13).toFixed(2);
    },
    reset: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.tax = 0;
      state.cartTotal = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;
