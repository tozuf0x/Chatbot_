import { render, screen } from '@/shared/tests';
import { NotFoundPage } from './NotFoundPage';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

describe('React component: AppCrashPage', () => {
  test('Should render correctly', () => {
    const renderedText = /404/;

    render(<NotFoundPage />);

    expect(screen.getAllByText(renderedText).length).not.toBe(0);
  });
});
