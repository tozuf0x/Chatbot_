import { getObjectKeys } from './getObjectKeys';

describe('Function: getObjectKeys', () => {
  test('Should return an array of object keys', () => {
    const mockObject = {
      a: 123,
      b: '123',
      c: [1, 2, 3]
    };

    const expectedResult = ['a', 'b', 'c'];

    const result = getObjectKeys(mockObject);

    expect(result).toEqual(expectedResult);
  });

  test('Should return an empty array', () => {
    const mockObject = {};
    const expectedResult: [] = [];

    const result = getObjectKeys(mockObject);

    expect(result).toEqual(expectedResult);
  });
});


