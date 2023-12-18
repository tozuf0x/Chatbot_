import { getObjectKeys } from './getObjectKeys';

export const getKeyByValue = <T extends object>(object: T, value: T[keyof T]): keyof T | undefined => getObjectKeys(object).find((key) => object[key] === value) ;

