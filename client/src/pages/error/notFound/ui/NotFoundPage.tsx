import { Button, Result, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { AppRoute } from '@/const';

const { Title, Text } = Typography;

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Интерфейс администрирования: 404</title>
      </Helmet>

      <Result
        className={styles.result}
        status="404"
        title={
          <Title className={styles.title} level={1}>
            Ошибка 404
          </Title>
        }
        subTitle={
          <Text className={styles.text}>
            Страница, которую вы посетили, не существует!
          </Text>
        }
        extra={
          <Button type="primary" shape="round" size="middle">
            <Link to={AppRoute.Root}>На главную</Link>
          </Button>
        }
      />
    </>
  );
}
