// types
import { TElementsData, TElementStaticData } from '../types';

export const findAllChildren = (
  allData: TElementsData['allData'],
  children: TElementStaticData['children'],
): TElementStaticData['children'] => [
  ...children,
  ...children.map(({ id }) => findAllChildren(allData, allData[id].children)).flat(),
];
