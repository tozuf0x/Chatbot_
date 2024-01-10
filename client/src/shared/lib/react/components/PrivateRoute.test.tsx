import { render, screen } from '../../../tests';
import { PrivateRoute } from './PrivateRoute';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

describe('React component: PrivateRoute', () => {
  it('Should render component when user is authorized', () => {
    const expectedText = 'some component';

    const preparedComponent = (
      <PrivateRoute isOpen>
        <span>{expectedText}</span>
      </PrivateRoute>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Should not render component when user is not authorized', () => {
    const notExpectedText = 'some component';

    const preparedComponent = (
      <PrivateRoute isOpen={false}>
        <span>{notExpectedText}</span>
      </PrivateRoute>
    );

    render(preparedComponent);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
