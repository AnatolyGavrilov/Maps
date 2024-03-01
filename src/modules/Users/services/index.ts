import { createAsyncThunk } from "@reduxjs/toolkit";

import { Api } from "@/enum";

import { ErrorMessageType } from "@/types";
import { IUser } from "../types";

import { configuredAxios } from "@/api";

export const getAplicationsThunk = createAsyncThunk<
  IUser[],
  { page?: number; limit?: number },
  { rejectValue: ErrorMessageType }
>("application/get", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get(Api.USERS_GET, {
      params: {
        page,
        limit,
      },
    });

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
