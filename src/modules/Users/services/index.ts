import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { ErrorMessageType } from "types";
import { HandleError } from "common/utils/handleError";
import { client } from "api";
import { usersRequest } from "api/users/usersGet";

export const getUsersThunk = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: ErrorMessageType }
>("application/get", async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.query(usersRequest);

    return data.users.data;
  } catch (error) {
    const errorObject = HandleError(error);
    return rejectWithValue(errorObject);
  }
});
