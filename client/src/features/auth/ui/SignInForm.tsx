import { Form, Input, Button, InputRef, Flex, Typography, notification } from 'antd';
import { ChangeEvent, Ref, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAuthToken } from '@/shared/api';
import { focusOnInput, useAppDispatch } from '@/shared/lib';
import { authApi } from '../api/authApi';
import { ValidationRule } from '../const';
import { setLogin } from '../model/authSlice';
import styles from './styles.module.scss';
import { AppRoute } from '@/const';

const { Title } = Typography;
const { Item } = Form;
const { Password } = Input;

export function SignInForm() {
  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [login, { isLoading }] = authApi.useLoginMutation();

  useEffect(() => {
    focusOnInput(inputRef);
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({ [evt.target.name]: evt.target.value });
  };

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleFormSubmit = async ({ email, password }: IAuthData) => {
    try {
      const response = await login({
        email: email.trim(),
        password: password.trim(),
      });

      if ('error' in response) {
        throw new Error();
      }

      dispatch(setLogin(response.data.user.email));
      saveAuthToken(response.data.accessToken);
      navigate(AppRoute.Root);
    } catch {
      notificationApi.error({
        message: 'Ошибка!',
        description: 'Не удалось авторизоваться',
        placement: 'topRight',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        className={styles.form}
        form={form}
        layout="vertical"
        autoComplete="off"
        disabled={isLoading}
        onFinish={(data: IAuthData) => void handleFormSubmit(data)}
      >
        <Title
          className={styles.title}
          level={1}
        >
          Авторизация
        </Title>

        <Item
          className={styles.label}
          label="Логин"
          name="email"
          rules={ValidationRule.Login}
        >
          <Input
            ref={inputRef as unknown as Ref<InputRef>}
            className={styles.input}
            allowClear
            onChange={handleFieldChange}
          />
        </Item>

        <Item
          className={styles.label}
          label="Пароль"
          name="password"
          rules={ValidationRule.Password}
        >
          <Password
            className={styles.input}
            allowClear
            onChange={handleFieldChange}
          />
        </Item>

        <Flex
          className={styles.buttons}
          justify="center"
          gap="middle"
        >
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
          >
            Войти
          </Button>

          <Button
            htmlType="button"
            type="link"
            danger
            onClick={handleFormReset}
          >
            Сбросить
          </Button>
        </Flex>
      </Form>
    </>
  );
}
