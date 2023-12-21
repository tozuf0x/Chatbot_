import { Layout, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';

const { Content } = Layout;

export function AuthPage() {
  return (
    <>
      <Helmet>
        <title>Интерфейс администрирования: вход в приложение</title>
      </Helmet>

      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <h1 className="visually-hidden">Интерфейс администрирования.</h1>
          <Typography.Title>Вход в приложение</Typography.Title>
        </Content>
      </Layout>
    </>
  );
}
