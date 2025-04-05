
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});

export const { loginUser, logoutUser, setAuth } = authSlice.actions;
export default authSlice.reducer;

