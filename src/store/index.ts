import { configureStore } from '@reduxjs/toolkit'

export const rootStore = () =>
  configureStore({
    reducer: {
      users: userReducer,
      publications: publicationsReducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof rootStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']