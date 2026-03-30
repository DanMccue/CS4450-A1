import { createSlice } from "@reduxjs/toolkit";

type AccountState = {
  currentUser: Record<string, unknown> | null;
};

const initialState: AccountState = { currentUser: null };
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
