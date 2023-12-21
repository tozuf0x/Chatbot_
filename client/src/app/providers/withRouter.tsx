import { Suspense } from 'react';
import { HistoryRouter } from '@/shared/lib';
import { Loader } from '@/shared/ui';
import { browserHistory } from '../browserHistory';

export const withRouter = (Component: Component) => {
  const DecoratedComponent = () => (
    <HistoryRouter history={browserHistory}>
      <Suspense fallback={<Loader fullPage />}>
        <Component />
      </Suspense>
    </HistoryRouter>
  );

  DecoratedComponent.displayName = 'Decorated component with History Router';

  return DecoratedComponent;
};
