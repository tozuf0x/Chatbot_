/* eslint-disable react/display-name */
import { render, RenderOptions } from '@testing-library/react';
import { BrowserHistory, createMemoryHistory } from 'history';
import { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { appStore } from '@/app/store/appStore';
import { HistoryRouter } from '../../lib/react/components/HistoryRouter';

const AllTheProviders =
  (history: BrowserHistory | undefined) =>
    ({ children }: { children: React.ReactNode }) => (
      <HelmetProvider>
        <ReduxProvider store={appStore}>
          <HistoryRouter history={history ?? createMemoryHistory()}>
            {children}
          </HistoryRouter>
        </ReduxProvider>
      </HelmetProvider>
    );

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
  history?: BrowserHistory
) => render(ui, { wrapper: AllTheProviders(history), ...options });

export * from '@testing-library/react';
export { customRender as render };
