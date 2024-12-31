import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isRecruiter: false,
    userData: null,
  };
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.isRecruiter = action.payload.isRecruiter;
        state.userData = action.payload.userData;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.isRecruiter = null;
        state.userData = null;
      },
    },
  });
  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;