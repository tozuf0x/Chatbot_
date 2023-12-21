import { combineReducers } from '@reduxjs/toolkit';
import { guidanceSlice } from '@/entities/guidance';
import { notificationSlice } from '@/shared/lib';

export const rootReducer = combineReducers({
  [notificationSlice.name]: notificationSlice.reducer,
  [guidanceSlice.name]: guidanceSlice.reducer,
});
