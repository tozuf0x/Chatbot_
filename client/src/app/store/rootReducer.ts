import { combineReducers } from '@reduxjs/toolkit';
import { authApi, authSlice } from '@/features/auth';
import { guidanceApi, guidanceSlice } from '@/entities/guidance';
import { notificationSlice } from '@/shared/lib';

export const rootReducer = combineReducers({
  [notificationSlice.name]: notificationSlice.reducer,
  [guidanceSlice.name]: guidanceSlice.reducer,
  [guidanceApi.reducerPath]: guidanceApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.name]: authSlice.reducer,
});
