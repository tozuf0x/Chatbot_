import { configureStore } from '@reduxjs/toolkit';
import { guidanceApi } from '@/entities/guidance';
import { redirect } from '../middlewares/redirect';
import { rootReducer } from './rootReducer';

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redirect, guidanceApi.middleware),
});

export type State = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
