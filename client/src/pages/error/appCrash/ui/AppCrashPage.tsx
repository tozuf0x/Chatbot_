import { Result, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';

const { Title, Text } = Typography;

export function AppCrashPage() {
  return (
    <>
      <Helmet>
        <title>Интерфейс администрирования: фатальная ошибка</title>
      </Helmet>

      <Result
        className={styles.result}
        status="error"
        title={
          <Title className={styles.title} level={1}>
            Фатальная ошибка
          </Title>
        }
        subTitle={
          <Text className={styles.text}>
            Что-то пошло не так...Пожалуйста, вернитесь позже!
          </Text>
        }
      >
      </Result>
    </>
  );
}
