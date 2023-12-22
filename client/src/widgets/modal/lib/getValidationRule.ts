import { Rule } from 'antd/es/form';
import { REQUIRED_ERROR_MESSAGE, WHITESPACE_ERROR_MESSAGE } from '@/shared/ui';

export const getValidationRule = (
  validator: (_: unknown, value: string) => Promise<void>
): Record<string, Rule[]> => ({
  ErrorCode: [
    {
      required: true,
      message: REQUIRED_ERROR_MESSAGE,
    },
    {
      whitespace: true,
      message: WHITESPACE_ERROR_MESSAGE,
    },
    {
      pattern: /^[a-zA-Z0-9\s]{2,20}\d{3}$/,
      message: `
          Введите строку от 5 до 23 символов,
          в которой можно использовать буквы латинского алфавита, цифры и пробелы
          (последними 3 символами должны быть цифры)
        `,
    },
  ],
  NewAppliedArea: [
    {
      whitespace: true,
      message: WHITESPACE_ERROR_MESSAGE,
    },
    {
      validator,
      message: 'Данная прикладная область уже существует',
    },
  ],
  ErrorText: [
    {
      required: true,
      message: REQUIRED_ERROR_MESSAGE,
    },
    {
      whitespace: true,
      message: WHITESPACE_ERROR_MESSAGE,
    },
  ],
  GuidanceText: [
    {
      required: true,
      message: REQUIRED_ERROR_MESSAGE,
    },
    {
      whitespace: true,
      message: WHITESPACE_ERROR_MESSAGE,
    },
  ],
});
