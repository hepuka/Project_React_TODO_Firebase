import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todonumbers: 0,
  completednumbers: 0,
  notesnumbers: 0,
};

const getNumbersSlice = createSlice({
  name: "getnumbers",
  initialState,
  reducers: {
    GET_NUMBERS: (state, action) => {
      const { todonumbers, completednumbers, notesnumbers } = action.payload;
      state.todonumbers = todonumbers;
      state.completednumbers = completednumbers;
      state.notesnumbers = notesnumbers;
    },
  },
});

export const { GET_NUMBERS } = getNumbersSlice.actions;
export const selectTodonumbers = (state) => state.getnumbers.todonumbers;
export const selectCompletednumbers = (state) =>
  state.getnumbers.completednumbers;
export const selectNotesnumbers = (state) => state.getnumbers.notesnumbers;

export default getNumbersSlice.reducer;
