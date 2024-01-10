import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { render, screen } from '@/shared/tests';
import { NotFoundPage } from './NotFoundPage';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

describe('React component: NotFoundPage', () => {
  const mockHistory = createBrowserHistory();

  beforeEach(() => {
    mockHistory.push('/notFound');
  });

  test('Should render correctly', () => {
    const renderedText = /404/;

    render(<NotFoundPage />);

    expect(screen.getAllByText(renderedText).length).not.toBe(0);
  });

  test('Should redirect to main page after click on button', async () => {
    const expectedResult = '/';

    render(<NotFoundPage />, undefined, mockHistory);
    await userEvent.click(screen.getByRole('link'));

    expect(mockHistory.location.pathname).toBe(expectedResult);
  });
});
