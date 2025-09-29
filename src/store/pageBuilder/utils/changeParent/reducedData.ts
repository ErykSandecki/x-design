// types
import { TElement } from 'types';
import { TElements } from '../../types';

export const reducedData = (data: Array<TElement>): TElements =>
  data.reduce((obj, data) => ({ ...obj, [data.id]: data }), {});
