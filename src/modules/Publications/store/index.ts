import { createSlice } from "@reduxjs/toolkit";
import { createPublicationThunk, getPublicationsThunk } from "../services";
import { IPublicationInitialState } from "../types";

const initialState: IPublicationInitialState = {
  publications: [],
};

const usersSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublicationsThunk.fulfilled, (state, { payload }) => {
      state.publications = payload;
    });
    builder.addCase(createPublicationThunk.fulfilled, (state, { payload }) => {
      state.publications = [payload, ...state.publications];
    });
  },
});

export default usersSlice.reducer;
