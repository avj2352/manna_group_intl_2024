/**
 * Checkout state store (Zustand)
 */
import { create } from "zustand";
import { ICartInventory } from "@/common/interfaces";

export type ICheckoutState = {
  checkout_items: number;
  cart_items: ICartInventory[];
  total_price: number;
  is_cart_displayed: boolean;
};

type CheckoutStore = ICheckoutState & {
  reset: () => void;
  setCheckoutCount: (count: number) => void;
  setCartItems: (items: ICartInventory[]) => void;
  resetCartItems: () => void;
  setTotalPrice: (price: number) => void;
  setIsCartDisplayed: (display: boolean) => void;
};

const initialState: ICheckoutState = {
  checkout_items: 0,
  cart_items: [],
  total_price: 0,
  is_cart_displayed: true,
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setCheckoutCount: (count) => set({ checkout_items: count }),
  setCartItems: (items) => set({ cart_items: items }),
  resetCartItems: () => set({ cart_items: [] }),
  setTotalPrice: (price) => set({ total_price: price }),
  setIsCartDisplayed: (display) => set({ is_cart_displayed: display }),
}));
