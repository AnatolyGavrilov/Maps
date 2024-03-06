import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPublication } from "../types";
import { ErrorMessageType } from "types";
import { HandleError } from "common/utils/handleError";
import { client } from "api";
import {
  publicationsCreate,
  publicationsGet,
} from "api/publications/publicationsGet";

export const getPublicationsThunk = createAsyncThunk<
  IPublication[],
  string,
  { rejectValue: ErrorMessageType }
>("application/get", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await client.query(publicationsGet(userId));

    return data.user.posts.data;
  } catch (error) {
    const errorObject = HandleError(error);
    return rejectWithValue(errorObject);
  }
});

export const createPublicationThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorMessageType }
>("application/create", async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.query(publicationsCreate());
    console.log("createPublicationThunkData", data);
    return data;
  } catch (error) {
    const errorObject = HandleError(error);
    return rejectWithValue(errorObject);
  }
});
