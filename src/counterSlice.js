import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
  },

  reducers: {
    incrementFirst: state => {
      state.value += 1;
    },

   decrement: state => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
        state.value += action.payload;
    },
  },
});

// Exports actions
export const { incrementFirst,  decrement, incrementByAmoun } =
  counterSlice.actions;

// Exports reducer
export default counterSlice.reducer;