import { render, screen } from '@/shared/tests';
import { AppCrashPage } from './AppCrashPage';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

describe('React component: AppCrashPage', () => {
  test('Should render correctly', () => {
    const renderedText = /ошибка/i;

    render(<AppCrashPage />);

    expect(screen.getAllByText(renderedText).length).not.toBe(0);
  });
});
