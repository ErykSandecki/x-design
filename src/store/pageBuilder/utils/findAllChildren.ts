// types
import { TElement } from 'types';
import { TElements } from '../types';

export const findAllChildren = (
  elements: TElements,
  children: TElement['children'],
  nested = true,
): TElement['children'] => [
  ...children,
  ...(nested ? [...children.map(({ id }) => findAllChildren(elements, elements[id].children)).flat()] : []),
];
