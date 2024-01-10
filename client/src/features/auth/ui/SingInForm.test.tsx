import userEvent from '@testing-library/user-event';
import { render, screen } from '@/shared/tests';
import { SignInForm } from './SignInForm';

jest.mock('../api/authApi', () => ({
  authApi: {
    useLoginMutation: () => [() => null, {}]
  }
}));

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

jest.mock('@/shared/lib', () => ({
  focusOnInput: () => null
}));

jest.mock('@/shared/ui', () => ({
  Loader: () => <>Loader</>,
  Logo: () => <>Logo</>,
}));

describe('React component: SignInForm', () => {
  it('Should render correctly', () => {
    const componentTitle = /авторизация/i;
    const loginLabel = /логин/i;
    const passwordLabel = /пароль/i;

    render(<SignInForm />);

    expect(screen.getByText(componentTitle)).toBeInTheDocument();
    expect(screen.getByText(loginLabel)).toBeInTheDocument();
    expect(screen.getByText(passwordLabel)).toBeInTheDocument();
  });

  it('Should render correctly when user enter login and password', async () => {
    const loginInputTestId = 'loginInput';
    const passwordInputTestId = 'passwordInput';
    const expectedLoginInputValue = 'some login';
    const expectedPasswordInputValue = 'some password';

    render(<SignInForm />);

    await userEvent.type(
      screen.getByTestId(loginInputTestId),
      expectedLoginInputValue
    );

    await userEvent.type(
      screen.getByTestId(passwordInputTestId),
      expectedPasswordInputValue
    );

    expect(screen.getByDisplayValue(expectedLoginInputValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordInputValue)).toBeInTheDocument();
  });
});
