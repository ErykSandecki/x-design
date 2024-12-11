// types
import { TObject } from 'types/generic';

export const mockAll = (pathName: string): TObject<jest.Mock<any, any>> => {
  const obj = jest.requireActual(pathName);
  const { mapValues } = jest.requireActual('lodash');

  return mapValues(obj, () => jest.fn());
};
