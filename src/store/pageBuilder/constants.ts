// others
import { BASE_2D } from 'shared';

// types
import { ElementType, TElement } from 'types';
import { TElementStaticData } from './types';

export const BASE_ALL_DATA: TElement = {
  backgroundColor: '#ffffff',
  children: ['m861mgpj1741791393558', 'm861mgpj17417913935518'],
  coordinates: BASE_2D,
  height: 0,
  id: '-1',
  parentId: 'none',
  position: 'absolute',
  rotate: 0,
  type: ElementType.base,
  width: 0,
};

export const BASE_STATIC_DATA: TElementStaticData = {
  children: BASE_ALL_DATA.children,
  id: BASE_ALL_DATA.id,
  parentId: BASE_ALL_DATA.parentId,
  position: BASE_ALL_DATA.position,
  type: BASE_ALL_DATA.type,
};
