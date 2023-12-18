import { HelmetProvider } from 'react-helmet-async';

export const withHelmet = (Component: Component) => {
  const DecoratedComponent = () => (
    <HelmetProvider>
      <Component />
    </HelmetProvider>
  );

  DecoratedComponent.displayName = 'Decorated component with Helmet';

  return DecoratedComponent;
};
