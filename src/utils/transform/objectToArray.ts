export const objectToArray = <T extends {}>(obj: T): Array<T[keyof T]> => Object.keys(obj).map((key) => obj[key]);
