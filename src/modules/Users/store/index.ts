import { createSlice } from "@reduxjs/toolkit";

import { IUsersInitialState } from "../types";

const initialState: IUsersInitialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAplicationsThunk.fulfilled, (state, { payload }) => {
      state.applications = payload;
    });
  },
});

export const { closeSuccessfulRegistrationModal } = userSlice.actions;

export default userSlice.reducer;
