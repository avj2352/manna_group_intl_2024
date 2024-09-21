import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ..type
export type IUser = {
  name: string;
  email: string;
  profilePic: string;
};

export type IAuthState = {
  token: string;
  user: IUser | undefined;
};

export const initialState: IAuthState = {
  token: "",
  user: undefined,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.token = "";
      state.user = undefined;
    },
    setUserDetails: (state, action: PayloadAction<IUser>) => {
      state.user = {
        ...action.payload,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export default AuthSlice.reducer;
export const { reset, setUserDetails, setToken } = AuthSlice.actions;