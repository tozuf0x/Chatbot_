import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction, createAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '@/shared/lib';
import { browserHistory } from '../browserHistory';
import { redirect } from './redirect';
import { AppRoute } from '@/const';

jest.mock('@/shared/lib', () => ({
  redirectToRoute: createAction<AppRoute>('app/redirectToRoute'),
}));

jest.mock('../browserHistory', () => ({
  browserHistory: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Middleware: redirect', () => {
  let store: MockStore;

  beforeAll(() => {
    const middlewares = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middlewares);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  test('Should redirect to "/auth" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Auth);

    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Auth);
  });

  test('Should not redirect to "/auth" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Auth };

    store.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoute.Auth);
  });
});
