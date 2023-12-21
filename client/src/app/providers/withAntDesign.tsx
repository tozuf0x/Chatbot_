import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { theme } from '../styles/theme.config';

export const withAntDesign = (Component: Component) => {
  const DecoratedComponent = () => (
    <ConfigProvider theme={theme} locale={ruRU}>
      <Component />
    </ConfigProvider>
  );

  DecoratedComponent.displayName = 'Decorated component with Ant Design';

  return DecoratedComponent;
};
