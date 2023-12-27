import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  login: Nullable<string>;
};

const initialState: initialStateType = {
  login: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<Nullable<string>>) {
      state.login = action.payload;
    },
  }
});

export const { setLogin } = authSlice.actions;
