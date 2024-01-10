import { FIRST_FILTER_NAME } from '@/entities/guidance';
import { getMockGuidance } from '@/entities/guidance/tests';
import { getAppliedAreas } from './getAppliedAreas';

jest.mock('@/entities/guidance', () => ({
  FIRST_FILTER_NAME: 'some text'
}));

describe('Function: getAppliedAreas', () => {
  const mockGuindance = getMockGuidance();

  test('Should return an array with filter names', () => {
    const expectedResult = [FIRST_FILTER_NAME, mockGuindance.appliedArea];

    const result = getAppliedAreas([mockGuindance]);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an array with one default filter name when guidances data does not exist', () => {
    const expectedResult = [FIRST_FILTER_NAME];

    const result = getAppliedAreas([]);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an array with one default filter name when guidances data is "undefined"', () => {
    const expectedResult = [FIRST_FILTER_NAME];

    const result = getAppliedAreas(undefined);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an array without duplicates', () => {
    const expectedResult = [FIRST_FILTER_NAME, mockGuindance.appliedArea];

    const result = getAppliedAreas([mockGuindance, mockGuindance, mockGuindance]);

    expect(result).toEqual(expectedResult);
  });
});
