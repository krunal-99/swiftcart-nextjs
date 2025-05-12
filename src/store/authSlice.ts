"use client";
import { AuthState } from "@/data/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    return {
      isAuthenticated: !!storedToken,
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken,
    };
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: AuthState["user"]; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
    restoreUserSession: (state) => {
      const storedToken = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        state.isAuthenticated = true;
        state.token = storedToken;
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { login, logout, restoreUserSession } = authSlice.actions;
export default authSlice.reducer;
