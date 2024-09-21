import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// ..custom
import authReducer from "@/common/state/features/auth/auth.slice";

export type API_STATUS = "initial" | "pending" | "success" | "error";

export type IBaseState = {
  status: API_STATUS;
  api_response: string;
};

export type ISearch = {
  text: string;
};

export const APP_VERSION = `0.3.1`;
export const API_URL = import.meta.env.VITE_API_URL;

export const store = configureStore({
  reducer: {
    auth: authReducer,    
  },
});

// ..store config
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ..use throughout application
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;