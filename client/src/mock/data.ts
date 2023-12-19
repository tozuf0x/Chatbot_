interface IData {
  errorCode: React.Key;
  appliedField: string;
  errorText: string;
  guidanceText: string;
}

const data: IData[] = [];

for (let i = 0; i < 51; i++) {
  data.push({
    errorCode: `mockErrorCodeQWERTYU${i}${i}${i}`,
    appliedField: `Прикладная область ${i}`,
    errorText: `Текст ошибки ${i}`,
    guidanceText: `Рекомендация ${i}`,
  });
}

export { data };
