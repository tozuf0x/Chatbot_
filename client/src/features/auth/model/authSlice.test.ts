import { getMockStore } from '../tests';
import { authSlice, setLogin } from './authSlice';

describe('Redux slice: "auth" domain', () => {
  const mockStore = getMockStore();
  const initialState = mockStore.auth;

  test('Should set a login', () => {
    const mockLogin = 'mock login';

    const expectedState: State['auth'] = {
      login: mockLogin,
    };

    const result = authSlice.reducer(initialState, setLogin(mockLogin));

    expect(result).toEqual(expectedState);
  });
});
