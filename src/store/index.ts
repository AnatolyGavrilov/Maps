import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "modules/Users/store";

export const rootStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof rootStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
