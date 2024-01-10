import { render, screen } from '../../tests';
import { Loader } from './Loader';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

describe('React component: Loader', () => {
  test('Should render correctly', () => {
    const loaderTestId = 'loader';

    render(<Loader />);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });
});
