import { configureStore } from "@reduxjs/toolkit";

import modal from "./slice/modalSlice";
import  sideNavReducer  from "./slice/navSlice";
import authReducer from "./slice/authSlice"
export const store = configureStore({
  reducer: {
    modal: modal,
    nav: sideNavReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
