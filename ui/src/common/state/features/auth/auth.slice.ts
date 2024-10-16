import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AuthAPIClient from "../../services/auth/auth.api";

const baseURL = import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:8000/auth';


// ..API calls
export const fetchUserAdminDetailsAPI = createAsyncThunk(
  'auth/fetchUserAdminDetailsAPI',
  async ({token}: {token: string}): Promise<any> => {
    const authClient = new AuthAPIClient(token, baseURL);
    const response = await authClient.checkIsAdmin();    
    return await response?.data;
  }
);

// ..type
export type IUser = {   
  name: string;
  email: string;
  profilePic: string;
};

export type IAuthState = {
  auth_status: 'initial' | 'pending' | 'fulfilled' | 'rejected'; 
  token: string;
  user: IUser | undefined;
  isAdmin: boolean;
};

export const initialState: IAuthState = {
  auth_status: 'initial',
  token: "",
  user: undefined,
  isAdmin: false,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.auth_status = 'initial';
      state.token = "";
      state.user = undefined;
      state.isAdmin = false;
    },
    setUserDetails: (state, action: PayloadAction<IUser>) => {
      state.user = {
        ...action.payload,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;    
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAdminDetailsAPI.pending, (state, _) => {
      state.auth_status = 'pending';
    });
    builder.addCase(fetchUserAdminDetailsAPI.fulfilled, (state, action) => {
      state.auth_status = 'fulfilled';
      state.isAdmin = action.payload?.message;
    });
    builder.addCase(fetchUserAdminDetailsAPI.rejected, (state, _) => {
      state.auth_status = 'rejected';
    });
  }
});

export default AuthSlice.reducer;
export const { reset, setUserDetails, setToken, setIsAdmin } = AuthSlice.actions;