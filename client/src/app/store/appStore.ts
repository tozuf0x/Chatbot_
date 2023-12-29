import { configureStore } from '@reduxjs/toolkit';
import { middlewares } from '../middlewares';
import { rootReducer } from './rootReducer';

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

export type State = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
