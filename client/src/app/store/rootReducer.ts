import { combineReducers } from '@reduxjs/toolkit';
import { notificationSlice } from '@/shared/lib';

export const rootReducer = combineReducers({
  [notificationSlice.name]: notificationSlice.reducer,
});
