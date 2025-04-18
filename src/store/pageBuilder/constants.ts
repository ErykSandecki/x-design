// others
import { BASE_2D } from 'shared';
import { THEME } from 'constant/localStorageKeys';
import { THEME_COLORS } from 'constant/themeColors';

// types
import { ElementType, TElement, Theme } from 'types';
import { TElementStaticData } from './types';

const value =
  localStorage.getItem(THEME) === Theme.dark
    ? THEME_COLORS.dark.neutral4
    : THEME_COLORS.light.neutral4;

export const BASE_ALL_DATA: TElement = {
  background: { alpha: '100', format: 'hex', value },
  children: [],
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
