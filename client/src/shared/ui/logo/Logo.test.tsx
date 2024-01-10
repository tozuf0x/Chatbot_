import { render, screen } from '../../tests';
import { Logo } from './Logo';

jest.mock('@/app/store/appStore', () => ({
  appStore: {
    getState: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
  },
}));

describe('React component: Logo', () => {
  test('Should render correctly', () => {
    const mockClass = 'logo';
    const imageAltText = /logo/i;

    render(<Logo className={mockClass} />);

    expect(screen.getByAltText(imageAltText)).toBeInTheDocument();
  });
});
