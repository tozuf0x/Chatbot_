export const sortByProperty = <T extends object>(propertyName: keyof T, isAscending = true) => {
  if (isAscending) {
    return (first: T, second: T) => {
      if (first[propertyName] === second[propertyName]) {
        return 0;
      }

      return first[propertyName] > second[propertyName] ? 1 : -1;
    };
  }

  return (first: T, second: T) => {
    if (first[propertyName] === second[propertyName]) {
      return 0;
    }

    return first[propertyName] < second[propertyName] ? 1 : -1;
  };
};
