import { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const AppCrashPage = lazy(() => import('@/pages/error/appCrash'));

export const withErrorBoundary = (Component: Component) => {
  const DecoratedComponent = () => (
    <ErrorBoundary fallback={<AppCrashPage />}>
      <Component />
    </ErrorBoundary>
  );

  DecoratedComponent.displayName = 'Decorated component with Error Boundary';

  return DecoratedComponent;
};
