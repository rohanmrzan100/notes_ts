
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  toggle: boolean;
  deleteToggle: boolean;
  updateToggle: boolean;
  _id: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  toggle: false,
  deleteToggle: false,
  updateToggle:false,
  _id: "",
};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      return {
        ...state,
        toggle: !state.toggle,
      };
    },
    deleteToggle: (state, action) => {
      return {
        ...state,
        deleteToggle: !state.deleteToggle,
        _id: action.payload,
      };
    },
    updateToggle: (state, action) => {
      return {
        ...state,
        updateToggle: !state.updateToggle,
        _id: action.payload,
      };
    },
  },
});

export const { toggleModal, deleteToggle, updateToggle } = modal.actions;

export default modal.reducer;
