export const getAppliedAreas = (data: IGuidanceData[]): string[] => data.reduce((acc: string[], item) => {
  if (!acc.includes(item.appliedArea)) {
    acc.push(item.appliedArea);
  }

  return acc;
}, ['Не выбрана']);
