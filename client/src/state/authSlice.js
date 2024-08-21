import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.userId = action.payload.uniqueId;
      state.token = action.payload.token;
    },
    setSignOut: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
