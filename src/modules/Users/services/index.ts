import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { ErrorMessageType } from "types";
import { configuredAxios } from "api";
import { Api } from "enum";
import { HandleError } from "common/utils/handleError";

export const getUsersThunk = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: ErrorMessageType }
>("application/get", async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get(Api.USERS_GET);

    return data;
  } catch (error) {
    const errorObject = HandleError(error);
    return rejectWithValue(errorObject);
  }
});
