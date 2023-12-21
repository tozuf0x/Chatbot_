import { Provider } from 'react-redux';
import { appStore } from '../store/appStore';

export const withRedux = (Component: Component) => {
  const DecoratedComponent = () => (
    <Provider store={appStore}>
      <Component />
    </Provider>
  );

  DecoratedComponent.displayName = 'Decorated component with Redux';

  return DecoratedComponent;
};
