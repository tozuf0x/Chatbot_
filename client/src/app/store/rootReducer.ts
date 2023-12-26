import { combineReducers } from '@reduxjs/toolkit';
import { guidanceApi, guidanceSlice } from '@/entities/guidance';

export const rootReducer = combineReducers({
  [guidanceSlice.name]: guidanceSlice.reducer,
  [guidanceApi.reducerPath]: guidanceApi.reducer,
});
