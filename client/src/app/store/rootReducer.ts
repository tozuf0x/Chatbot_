import { combineReducers } from '@reduxjs/toolkit';
import { authApi, authSlice } from '@/features/auth';
import { guidanceApi, guidanceSlice } from '@/entities/guidance';

export const rootReducer = combineReducers({
  [guidanceSlice.name]: guidanceSlice.reducer,
  [guidanceApi.reducerPath]: guidanceApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.name]: authSlice.reducer,
});
