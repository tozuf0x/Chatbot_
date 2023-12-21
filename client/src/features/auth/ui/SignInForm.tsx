import { Form, Input, Button, InputRef, Flex, Typography } from 'antd';
import { ChangeEvent, Ref, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { focusOnInput } from '@/shared/lib';
import { ValidationRule } from '../const';
import styles from './styles.module.scss';
import { AppRoute } from '@/const';

const { Title } = Typography;
const { Item } = Form;
const { Password } = Input;

export function SignInForm() {
  const inputRef = useRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    focusOnInput(inputRef);
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({ [evt.target.name]: evt.target.value });
  };

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleFormSubmit = (userData: IUserData) => {
    console.log('Была произведена авторизация с данными: ', userData);
    navigate(AppRoute.Root);
  };

  return (
    <Form
      className={styles.form}
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Title className={styles.title} level={2}>
        Авторизация
      </Title>

      <Item
        className={styles.label}
        label="Логин"
        name="login"
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

      <Flex className={styles.buttons} justify="center" gap="middle">
        <Button htmlType="submit" type="primary">
          Войти
        </Button>

        <Button htmlType="button" type="link" danger onClick={handleFormReset}>
          Сбросить
        </Button>
      </Flex>
    </Form>
  );
}
