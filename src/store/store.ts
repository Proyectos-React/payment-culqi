import { configureStore } from '@reduxjs/toolkit';
import { culqiApi } from './apis';

export const store = configureStore({
  reducer: {
    [culqiApi.reducerPath]: culqiApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(culqiApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch