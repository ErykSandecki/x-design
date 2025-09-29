// others
import {
  ADD_ELEMENT,
  CHANGE_BACKGROUND,
  CHANGE_LAYOUT,
  CHANGE_PARENT,
  CHANGE_POSITION,
  ROTATE_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  RESIZE_ELEMENT,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  SET_ELEMENTS_SIZES,
} from './actionsType';
import { BASE_2D, BASE_3D } from 'shared';
import { THEME } from 'constant/localStorageKeys';
import { THEME_COLORS } from 'constant/themeColors';

// types
import { ElementType, LayoutType, TElement, Theme } from 'types';
import { TElements, TPage } from './types';

const color = localStorage.getItem(THEME) === Theme.dark ? THEME_COLORS.dark.neutral4 : THEME_COLORS.light.neutral4;

export const BASE_ALL_DATA: TElement = {
  alignment: {},
  angle: 0,
  background: {
    properties: { alpha: '100', color, format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: BASE_2D,
  deepLevel: 0,
  height: { value: 0 },
  id: '-1',
  layout: { type: LayoutType.default },
  parentId: '-1',
  position: 'absolute',
  type: ElementType.base,
  width: { value: 0 },
};

export const BASE_PAGE_ELEMENTS: TElements = {
  [BASE_ALL_DATA.id]: BASE_ALL_DATA,
};

export const BASE_PAGE: TPage = {
  areaCoordinates: BASE_3D,
  elements: BASE_PAGE_ELEMENTS,
  id: '0',
  name: 'Page 1',
  prevState: undefined,
  reducerHistory: [
    {
      areaCoordinates: BASE_3D,
      elements: BASE_PAGE_ELEMENTS,
      selectedElements: [],
    },
  ],
  reducerHistoryIndex: 0,
  selectedElements: [],
};

export const MAX_LENGTH_HISTORY = 50;

export const REDUCER_HISTORY_SAVE_ACTIONS = [
  ADD_ELEMENT,
  CHANGE_LAYOUT,
  CHANGE_PARENT,
  CHANGE_POSITION,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  UNSELECT_ELEMENT,
];

export const REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS = [
  CHANGE_BACKGROUND,
  ROTATE_ELEMENTS,
  RESIZE_ELEMENT,
  SET_AREA_COORDINATES,
  SET_ELEMENTS_COORDINATES,
  SET_ELEMENTS_SIZES,
];
