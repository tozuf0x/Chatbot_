import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  notification: Nullable<INotificationData>;
};

const initialState: initialStateType = {
  notification: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action: PayloadAction<Nullable<INotificationData>>) {
      state.notification = action.payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;
