import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mode } from '@/const';

type initialStateType = {
  mode: Mode;
};

const initialState: initialStateType = {
  mode: Mode.Idle,
};

export const guidanceSlice = createSlice({
  name: 'guidance',
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    }
  },
});

export const { changeMode } = guidanceSlice.actions;
