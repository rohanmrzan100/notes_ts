import { configureStore } from "@reduxjs/toolkit";

import addNoteModalReducer from "./slice/modalSlice"
import  sideNavReducer  from "./slice/navSlice";
export const store = configureStore({
  reducer: {
    modal: addNoteModalReducer,
    nav: sideNavReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
