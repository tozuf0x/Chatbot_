import { render, screen } from '@testing-library/react';
import { AppCrashPage } from './AppCrashPage';

describe('React component: AppCrashPage', () => {
  test('Should render correctly', () => {
    const renderedText = /фатальная ошибка/i;

    render(<AppCrashPage />);

    expect(screen.getAllByText(renderedText).length).not.toBe(0);
  });
});
