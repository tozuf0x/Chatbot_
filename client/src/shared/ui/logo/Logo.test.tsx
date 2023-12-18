import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('React component: Logo', () => {
  test('Should render correctly', () => {
    const mockClass = 'logo';
    const imageAltText = /logo/i;

    render(<Logo className={mockClass} />);

    expect(screen.getByAltText(imageAltText)).toBeInTheDocument();
  });
});
