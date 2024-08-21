import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedExpenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setCheck: (state, action) => {
      state.checkedExpenses.push(action.payload);
    },
    setUncheck: (state, action) => {
      state.checkedExpenses = state.checkedExpenses.filter((expense) => {
        if (expense._id === action.payload._id) {
          return false;
        }
        return true;
      });
    },
    setUncheckAll: (state) => {
      state.checkedExpenses = [];
    },
  },
});

export const { setCheck, setUncheck, setUncheckAll } = expenseSlice.actions;
export default expenseSlice.reducer;
