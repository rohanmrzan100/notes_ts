import { createSlice } from "@reduxjs/toolkit";


// Define a type for the slice state
interface CounterState {
  toggle: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  toggle: false,
};

export const counterSlice = createSlice({
  name: "addNoteModal",

  initialState,
  reducers: {
    toggleModal: (state, action) => {
      
      return {
        ...state,
       toggle:!state.toggle,
      };
    },
  },
});

export const {toggleModal  } = counterSlice.actions;


export default counterSlice.reducer;
