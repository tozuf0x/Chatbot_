import { getMockGuidance } from '@/entities/guidance/tests';
import { getAppliedAreaFilters } from './getAppliedAreaFilters';

describe('Function: getAppliedAreaFilters', () => {
  const mockGuindance = getMockGuidance();

  test('Should return an array with filter objects', () => {
    const expectedResult = [{
      text: mockGuindance.appliedArea,
      value: mockGuindance.appliedArea,
    }];

    const result = getAppliedAreaFilters([mockGuindance]);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an empty array when guidances data does not exist', () => {
    const expectedResult: [] = [];

    const result = getAppliedAreaFilters([]);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an empty array when guidances data is "undefined"', () => {
    const expectedResult: [] = [];

    const result = getAppliedAreaFilters(undefined);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an array without duplicates', () => {
    const expectedResult = [{
      text: mockGuindance.appliedArea,
      value: mockGuindance.appliedArea,
    }];

    const result = getAppliedAreaFilters([mockGuindance, mockGuindance, mockGuindance]);

    expect(result).toEqual(expectedResult);
  });
});


