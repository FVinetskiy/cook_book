import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TState = {
  user: {
    email?: string;
    phoneNumber?: string;
    displayName?: string;
    emailVerified?: boolean;
  };
  isAuth: boolean;
};

const initialState: TState = {
  user: {},
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser(state, action) {
      state.user = action.payload;
    },
    geIsAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const userState = (state: RootState) => state.authSlice;
export const isAuthState = (state: RootState) => state.authSlice.isAuth;
export const { getCurrentUser, geIsAuth } = authSlice.actions;
export default authSlice.reducer;
