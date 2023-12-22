import { Layout } from 'antd';
import { Helmet } from 'react-helmet-async';
import { SignInForm } from '@/features/auth';
import styles from './styles.module.scss';

const { Content } = Layout;

export function AuthPage() {
  return (
    <>
      <Helmet>
        <title>Интерфейс администрирования: авторизация</title>
      </Helmet>

      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <SignInForm />
        </Content>
      </Layout>
    </>
  );
}
