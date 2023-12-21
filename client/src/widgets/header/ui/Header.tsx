import { Layout, Row, Col, Typography, Flex } from 'antd';
import { Logo } from '@/shared/ui';
import styles from './styles.module.scss';

const { Link, Text } = Typography;

interface IHeader {
  isAuthPage?: boolean;
}

export function Header({ isAuthPage = false }: IHeader) {
  //!TODO: реализовать разлогин
  // const handleSignOut = () => {
  //   dispatch(signOut());
  // };

  return (
    <Layout.Header className={styles.header}>
      <Row justify="center" gutter={10}>
        <Col className={styles.col} span={10}></Col>
        <Col className={styles.logo} span={4}>
          <Logo width={100} height={40} alt="Логотип Северстали." />
        </Col>
        <Col className={styles['sign-out']} span={10}>
          {!isAuthPage && (
            <Flex gap="middle">
              <Text className={styles.mail}>mock@mockmail.com</Text>
              <Link className={styles.link}>Выйти</Link>
            </Flex>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
}
