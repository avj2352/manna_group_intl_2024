import { ICartInventory } from "@/common/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ICheckoutState = {
  checkout_items: number;
  cart_items: ICartInventory[];
  total_price: number;
  is_cart_displayed: boolean;
};

export const initialState: ICheckoutState = {
  checkout_items: 0,
  cart_items: [],
  total_price: 0,
  is_cart_displayed: true,
};

export const CheckoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.checkout_items = 0;
      state.cart_items = [];
      state.total_price = 0;
      state.is_cart_displayed = true;
    },
    setCheckoutCount: (state, action: PayloadAction<number>) => {
      state.checkout_items = action.payload;
    },
    setCartItems: (state, action: PayloadAction<ICartInventory[]>) => {
      state.cart_items = action.payload;
    },
    resetCartItems: (state, _: PayloadAction<{}>) => {
      state.cart_items = [];
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.total_price = action.payload;
    },
    setIsCartDisplayed: (state, action: PayloadAction<boolean>) => {
      state.is_cart_displayed = action.payload;
    },
  },
});

export default CheckoutSlice.reducer;
export const {
  reset,
  setCheckoutCount,
  setCartItems,
  setTotalPrice,
  resetCartItems,
  setIsCartDisplayed,
} = CheckoutSlice.actions;
