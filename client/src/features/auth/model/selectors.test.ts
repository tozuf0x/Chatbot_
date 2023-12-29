import { getMockStore } from '../tests';
import { loginSelector } from './selectors';

describe('Redux selectors: "auth" domain', () => {
  const mockStore = getMockStore();

  describe('Selector: loginSelector', () => {
    test('Should return a login', () => {
      const expectedResult = mockStore.auth.login;

      const result = loginSelector(mockStore);

      expect(result).toBe(expectedResult);
    });
  });
});
