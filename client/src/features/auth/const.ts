import { Rule } from 'antd/es/form';
import { REQUIRED_ERROR_MESSAGE, WHITESPACE_ERROR_MESSAGE } from '@/shared/ui';

export const ValidationRule: Record<string, Rule[]> = {
  Login: [
    {
      required: true,
      message: REQUIRED_ERROR_MESSAGE,
    },
    {
      whitespace: true,
      message: WHITESPACE_ERROR_MESSAGE,
    },
  ],
  Password: [
    {
      required: true,
      message: REQUIRED_ERROR_MESSAGE,
    },
    {
      whitespace: true,
      message: WHITESPACE_ERROR_MESSAGE,
    },
  ],
};
