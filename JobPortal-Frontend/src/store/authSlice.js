import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isRecruiter: false,
  isAdmin: false, // Added isAdmin state
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isRecruiter = action.payload.isRecruiter;
      state.isAdmin = action.payload.isAdmin; // Added logic to handle isAdmin
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isRecruiter = false;
      state.isAdmin = false; // Reset isAdmin on logout
      state.userData = null;
    },
    addJobIdToRecruiter: (state, action) => {
      if (state.isRecruiter) {
        state.userData?.jobIds?.push(action.payload.jobId);
      }
    },
  },
});

export const { login, logout, addJobIdToRecruiter } = authSlice.actions;

export default authSlice.reducer;
