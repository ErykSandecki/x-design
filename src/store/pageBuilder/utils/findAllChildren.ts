// types
import { TElement } from 'types';
import { TElements } from '../types';

export const findAllChildren = (elements: TElements, children: TElement['children']): TElement['children'] => [
  ...children,
  ...children.map(({ id }) => findAllChildren(elements, elements[id].children)).flat(),
];
