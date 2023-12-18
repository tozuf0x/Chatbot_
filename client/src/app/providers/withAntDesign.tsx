import { ConfigProvider } from 'antd';
import { theme } from '../styles/theme.config';

export const withAntDesign = (Component: Component) => {
  const DecoratedComponent = () => (
    <ConfigProvider theme={theme}>
      <Component />
    </ConfigProvider>
  );

  DecoratedComponent.displayName = 'Decorated component with Ant Design';

  return DecoratedComponent;
};
