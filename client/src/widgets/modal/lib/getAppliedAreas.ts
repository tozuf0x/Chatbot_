import { FIRST_FILTER_NAME } from '@/entities/guidance';

export const getAppliedAreas = (data: IGuidanceData[] | undefined): string[] => {
  if (!data) {
    return [FIRST_FILTER_NAME];
  }

  return data.reduce(
    (acc: string[], item) => {
      if (!acc.includes(item.appliedArea)) {
        acc.push(item.appliedArea);
      }

      return acc;
    },
    [FIRST_FILTER_NAME]
  );
};
