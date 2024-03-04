import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPublication } from "../types";
import { ErrorMessageType } from "types";
import { HandleError } from "common/utils/handleError";
import { client } from "api";
import { publicationsGet } from "api/publications/publicationsGet";

export const getPublicationsThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorMessageType }
>("application/get", async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.query(publicationsGet);
    console.log("data.user.posts.data", data.user.posts.data);
    return data.user.posts.data;
  } catch (error) {
    const errorObject = HandleError(error);
    return rejectWithValue(errorObject);
  }
});
