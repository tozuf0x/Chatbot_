const guidances: IGuidanceData[] = [];

for (let i = 0; i < 51; i++) {
  guidances.push({
    errorCode: `mockErrorCodeQWERTYU${i}${i}${i}`,
    appliedArea: `Прикладная область ${i}`,
    errorText: `Текст ошибки ${i}`,
    guidanceText: `Рекомендация ${i}`,
  });
}

export { guidances };
