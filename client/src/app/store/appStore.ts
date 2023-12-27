import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth';
import { guidanceApi } from '@/entities/guidance';
import { rootReducer } from './rootReducer';

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(guidanceApi.middleware, authApi.middleware),
});

export type State = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
