import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Typography, Flex } from 'antd';
import { authApi, loginSelector, setLogin } from '@/features/auth';
import { dropAuthToken } from '@/shared/api';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Loader, Logo } from '@/shared/ui';
import styles from './styles.module.scss';

const { Link, Text } = Typography;

export function Header() {
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector(loginSelector);
  const [logout, { isLoading }] = authApi.useLogoutMutation();

  const handleSignOut = async () => {
    //NOTE: временный сервер не предоставляет разлогин
    //await logout(null);

    dropAuthToken();
    dispatch(setLogin(null));
  };

  return (
    <Layout.Header className={styles.header}>
      <Row
        justify="center"
        gutter={10}
      >
        <Col
          className={styles.col}
          span={10}
        >
        </Col>

        <Col
          className={styles.logo}
          span={4}
        >
          <Logo
            width={100}
            height={40}
            alt="Логотип Северстали."
          />
        </Col>

        <Col
          className={styles['sign-out']}
          span={10}
        >
          <Flex gap="middle">
            <Text className={styles.mail}>{userLogin}</Text>

            <Link
              className={styles.link}
              onClick={() => void handleSignOut()}
            >
              {isLoading ? (
                <Loader indicator={<LoadingOutlined className={styles.loader} />} />
              ) : (
                'Выйти'
              )}
            </Link>
          </Flex>
        </Col>
      </Row>
    </Layout.Header>
  );
}
