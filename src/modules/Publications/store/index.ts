import { createSlice } from "@reduxjs/toolkit";
import { getPublicationsThunk } from "../services";

const initialState: any = {
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
  },
});

export default usersSlice.reducer;
