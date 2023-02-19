import { configureStore } from '@reduxjs/toolkit';
import { culqiApi } from './apis';
import { culqiYapeApi } from './apis/culqiYapeApi';

export const store = configureStore({
  reducer: {
    [culqiApi.reducerPath]: culqiApi.reducer,
    [culqiYapeApi.reducerPath]: culqiYapeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(culqiApi.middleware, culqiYapeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch