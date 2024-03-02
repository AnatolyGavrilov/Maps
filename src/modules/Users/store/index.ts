import { createSlice } from "@reduxjs/toolkit";

import { IUsersInitialState } from "../types";
import { getUsersThunk } from "../services";

const initialState: any = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export default usersSlice.reducer;
