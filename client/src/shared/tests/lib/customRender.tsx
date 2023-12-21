import { render, RenderOptions } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { appStore } from '@/app/store/appStore';
import { HistoryRouter } from '../../lib/react/components/HistoryRouter';

interface IAllTheProviders {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: IAllTheProviders) => {
  const memoryHistory = createMemoryHistory();

  return (
    <HelmetProvider>
      <ReduxProvider store={appStore}>
        <HistoryRouter history={memoryHistory}>{children}</HistoryRouter>
      </ReduxProvider>
    </HelmetProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
