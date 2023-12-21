import { Rule } from 'antd/es/form';

const requiredErrorMessage = 'Обязательное поле';
const whitespaceErrorMessage = 'Поле не может состоять только из пробелов';

export const ValidationRule: Record<string, Rule[]> = {
  Login: [
    {
      required: true,
      message: requiredErrorMessage,
    },
    {
      whitespace: true,
      message: whitespaceErrorMessage,
    },
  ],
  Password: [
    {
      required: true,
      message: requiredErrorMessage,
    },
    {
      whitespace: true,
      message: whitespaceErrorMessage,
    }
  ]
};
