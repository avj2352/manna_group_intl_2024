/**
 * Auth state store (Zustand)
 */
import { create } from "zustand";
import AuthAPIClient from "@/common/state/services/auth/auth.api";
import { VITE_AUTH_API_URL } from "@/util/envConfig";

export type IUser = {
  name: string;
  email: string;
  profilePic: string;
};

export type IAuthState = {
  auth_status: "initial" | "pending" | "fulfilled" | "rejected";
  token: string;
  user: IUser | undefined;
  isAdmin: boolean;
  isGuest: boolean;
};

type AuthStore = IAuthState & {
  reset: () => void;
  setUserDetails: (user: IUser) => void;
  setToken: (token: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsGuest: (isGuest: boolean) => void;
  fetchUserAdminDetailsAPI: (params: { token: string }) => Promise<void>;
};

const initialState: IAuthState = {
  auth_status: "initial",
  token: "",
  user: undefined,
  isAdmin: false,
  isGuest: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setUserDetails: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsGuest: (isGuest) => set({ isGuest }),
  fetchUserAdminDetailsAPI: async ({ token }) => {
    set({ auth_status: "pending" });
    try {
      const client = new AuthAPIClient(token, VITE_AUTH_API_URL);
      const response = await client.checkIsAdmin();
      set({ auth_status: "fulfilled", isAdmin: response.data?.message });
    } catch {
      set({ auth_status: "rejected" });
    }
  },
}));
