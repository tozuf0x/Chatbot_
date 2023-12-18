import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('React component: Loader', () => {
  test('Should render correctly', () => {
    const loaderTestId = 'loader';

    render(<Loader />);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });
});
