import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ICheckoutState = {
  checkout_items: number;
};

export const initialState: ICheckoutState = {
  checkout_items: 0,
};

export const CheckoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.checkout_items = 0;
    },
    setCheckoutCount: (state, action: PayloadAction<number>) => {
      state.checkout_items = action.payload;
    },
  },
});

export default CheckoutSlice.reducer;
export const { reset, setCheckoutCount } = CheckoutSlice.actions;
