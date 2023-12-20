import { Rule } from 'antd/es/form';

const requiredErrorMessage = 'Обязательное поле';
const whitespaceErrorMessage = 'Поле не может состоять только из пробелов';

export const validationRule: Record<string, Rule[]> = {
  ErrorCode: [
    {
      required: true,
      message: requiredErrorMessage,
    },
    {
      whitespace: true,
      message: whitespaceErrorMessage,
    },
    {
      pattern: /^[a-zA-Z0-9\s]{2,20}\d{3}$/,
      message: `
        Введите строку от 2 до 23 символов,
        в которой можно использовать буквы латинского алфавита, цифры и пробелы
        (последними 3 символами должны быть цифры)
      `,
    },
  ],
  NewAppliedArea: [
    {
      whitespace: true,
      message: whitespaceErrorMessage,
    },
  ],
  ErrorText: [
    {
      required: true,
      message: requiredErrorMessage,
    },
    {
      whitespace: true,
      message: whitespaceErrorMessage,
    },
  ],
  GuidanceText: [
    {
      required: true,
      message: requiredErrorMessage,
    },
    {
      whitespace: true,
      message: whitespaceErrorMessage,
    },
  ],
};
