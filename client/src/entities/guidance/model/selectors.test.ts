import { getMockGuidance, getMockStore } from '../tests';
import { modeSelector, selectedGuidancesSelector } from './selectors';

describe('Redux selectors: "guidance" domain', () => {
  const mockGuidance = getMockGuidance();
  const mockStore = getMockStore([mockGuidance]);

  describe('Selector: modeSelector', () => {
    test('Should return a mode', () => {
      const expectedResult = mockStore.guidance.mode;

      const result = modeSelector(mockStore);

      expect(result).toBe(expectedResult);
    });
  });

  describe('Selector: selectedGuidancesSelector', () => {
    test('Should return an array of notes', () => {
      const expectedResult = mockStore.guidance.selectedGuidances;

      const result = selectedGuidancesSelector(mockStore);

      expect(result).toEqual(expectedResult);
    });
  });
});
