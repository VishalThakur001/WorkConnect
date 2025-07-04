import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer } from "redux-persist";

const initialState = {
  user: null,
  accessToken: null,
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.role = user?.role || null;
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.role = user?.role || null;
      state.isAuthenticated = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearUserInfo: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "accessToken", "role", "isAuthenticated"],
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);

export const {
  setCredentials,
  setUser,
  updateUser,
  setAccessToken,
  updateAccessToken,
  clearUserInfo,
  logout,
} = userSlice.actions;