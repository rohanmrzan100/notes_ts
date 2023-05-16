import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface State {
  toggle: boolean;
}

// Define the initial state using that type
const initialState: State = {
  toggle: false,
};

export const sideNavReducer = createSlice({
  name: "sideNav",

  initialState,
  reducers: {
    toggleSideNav: (state, action) => {
      return {
        ...state,
        toggle: !state.toggle,
      };
    },
  },
});

export const { toggleSideNav } = sideNavReducer.actions;

export default sideNavReducer.reducer;
