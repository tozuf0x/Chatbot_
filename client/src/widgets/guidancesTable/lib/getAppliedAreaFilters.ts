interface FilterItemType {
  text: string;
  value: string;
}

export const getAppliedAreaFilters = (
  data: IGuidanceData[]
): FilterItemType[] => data.reduce((acc: FilterItemType[], filterItem) => {
  const newFilterItem: FilterItemType = {
    text: filterItem.appliedArea,
    value: filterItem.appliedArea,
  };

  const hasFilterItem = acc.find((item: FilterItemType) => item.text === newFilterItem.text);

  if (!hasFilterItem) {
    acc.push(newFilterItem);
  }

  return acc;
}, []);
