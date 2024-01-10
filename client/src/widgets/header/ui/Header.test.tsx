import { render, screen } from '@/shared/tests';
import { Header } from './Header';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

jest.mock('@/features/auth', () => ({
  loginSelector: () => null,
  setLogin: () => null,
  authApi: {
    useLogoutMutation: () => [() => null, {}]
  }
}));

jest.mock('@/shared/api', () => ({
  dropAuthToken: () => null
}));

jest.mock('@/shared/lib', () => ({
  useAppDispatch: () => null,
  useAppSelector: (selector: unknown) => selector
}));

jest.mock('@/shared/ui', () => ({
  Loader: () => <>Loader</>,
  Logo: () => <>Logo</>,
}));

describe('React component: Header', () => {
  test('Should render correctly', () => {
    const headerTestId = 'header';

    render(<Header />);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
