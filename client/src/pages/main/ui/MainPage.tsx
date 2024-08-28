import { Divider, Layout, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { GuidancesTable } from '@/widgets/guidancesTable';
import { Header } from '@/widgets/header';
import { ModalEntry } from '@/widgets/modal';
import styles from './styles.module.scss';

const { Content } = Layout;
const { Title } = Typography;

export function MainPage() {
  return (
    <>
      <Helmet>
        <title>Интерфейс администрирования: главная страница</title>
      </Helmet>

      <Layout className={styles.layout}>
        <Header />

        <Content className={styles.content}>
          <Title
            className={styles.title}
            level={1}
          >
            Интерфейс администрирования базы данных чат-бота поддержки пользователей
            по&nbsp;ошибкам направления P2P&nbsp;S4
          </Title>

          <div className={styles['divider-wrapper']}>
            <Divider className={styles.divider} />
          </div>

          <GuidancesTable />
          <ModalEntry />
        </Content>
      </Layout>
    </>
  );
}