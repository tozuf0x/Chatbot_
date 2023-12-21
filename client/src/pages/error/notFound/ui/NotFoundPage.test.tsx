import { render, screen } from '@/shared/tests';
import { NotFoundPage } from './NotFoundPage';

jest.mock('@/app/store/rootReducer', () => ({
  rootReducer: {},
}));

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

jest.mock('@/shared/lib', () => ({
  notificationSlice: {
    name: 'mock',
    initialState: undefined,
    reducers: {
      someReducer() {
        return null;
      },
    },
  },
  createStatusObjectSelector: () => null,
  useBreakpoint: () => null,
  isMobile: () => null,
}));

describe('React component: AppCrashPage', () => {
  test('Should render correctly', () => {
    const renderedText = /404/;

    render(<NotFoundPage />);

    expect(screen.getAllByText(renderedText).length).not.toBe(0);
  });
});
