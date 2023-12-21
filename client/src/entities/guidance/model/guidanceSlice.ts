import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mode } from '@/const';

type initialStateType = {
  mode: Mode;
  selectedGuidances: IGuidanceData[];
};

const initialState: initialStateType = {
  mode: Mode.Idle,
  selectedGuidances: [],
};

export const guidanceSlice = createSlice({
  name: 'guidance',
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    changeSelectedGuidances(state, action: PayloadAction<IGuidanceData[]>) {
      state.selectedGuidances = action.payload;
    }
  },
});

export const { changeMode, changeSelectedGuidances } = guidanceSlice.actions;
