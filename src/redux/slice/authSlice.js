import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  avatar: null,
  name: null,
  email: null,
  password: null,
  role: null,
  createdAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { id, avatar, name, email, password, role } = action.payload;
      state.isLoggedIn = true;
      state.id = id;
      state.avatar = avatar;
      state.name = name;
      state.email = email;
      state.password = password;
      state.role = role;
      state.createdAt = new Date().toLocaleDateString();
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.avatar = null;
      state.name = null;
      state.email = null;
      state.password = null;
      state.role = null;
      state.createdAt = null;
    },
    SET_NEW_PASSWORD: (state, action) => {
      state.password = action.payload.password;
    },
  },
});
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_NEW_PASSWORD } =
  authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectId = (state) => state.auth.id;
export const selectAvatar = (state) => state.auth.avatar;
export const selectName = (state) => state.auth.name;
export const selectEmail = (state) => state.auth.email;
export const selectPassword = (state) => state.auth.password;
export const selectRole = (state) => state.auth.role;

export default authSlice.reducer;
