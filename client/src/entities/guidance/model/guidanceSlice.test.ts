import { getMockGuidance, getMockStore } from '../tests';
import { guidanceSlice, changeMode, changeSelectedGuidances } from './guidanceSlice';
import { Mode } from '@/const';

describe('Redux slice: "guidance" domain', () => {
  const mockGuidance = getMockGuidance();
  const mockStore = getMockStore();
  const initialState = mockStore.guidance;

  test('Should change mode', () => {
    const expectedState: State['guidance'] = {
      mode: Mode.Delete,
      selectedGuidances: [],
    };

    const result = guidanceSlice.reducer(initialState, changeMode(Mode.Delete));

    expect(result).toEqual(expectedState);
  });

  test('Should change selected guidances', () => {
    const expectedState: State['guidance'] = {
      mode: Mode.Idle,
      selectedGuidances: [mockGuidance],
    };

    const result = guidanceSlice.reducer(initialState, changeSelectedGuidances([mockGuidance]));

    expect(result).toEqual(expectedState);
  });
});
