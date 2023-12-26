import { Layout, Row, Col, Typography, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/shared/ui';
import styles from './styles.module.scss';
import { AppRoute } from '@/const';

const { Link, Text } = Typography;

export function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    //!TODO: реализовать разлогин
    navigate(AppRoute.Auth);
  };

  return (
    <Layout.Header className={styles.header}>
      <Row justify="center" gutter={10}>
        <Col className={styles.col} span={10}></Col>
        <Col className={styles.logo} span={4}>
          <Logo width={100} height={40} alt="Логотип Северстали." />
        </Col>
        <Col className={styles['sign-out']} span={10}>
          <Flex gap="middle">
            <Text className={styles.mail}>mock@mockmail.com</Text>
            <Link className={styles.link} onClick={handleSignOut}>
              Выйти
            </Link>
          </Flex>
        </Col>
      </Row>
    </Layout.Header>
  );
}
