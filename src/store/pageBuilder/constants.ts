// others
import {
  ADD_ELEMENT,
  CHANGE_BACKGROUND,
  CHANGE_PARENT,
  CHANGE_POSITION,
  ROTATE_ELEMENT,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENT_COORDINATES,
  SET_ELEMENT_SIZES,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
} from './actionsType';
import { BASE_2D, BASE_3D } from 'shared';
import { THEME } from 'constant/localStorageKeys';
import { THEME_COLORS } from 'constant/themeColors';

// types
import { ElementType, TElement, Theme } from 'types';
import {
  TElementDynamicData,
  TElementsData,
  TElementStaticData,
  TPage,
} from './types';

const color =
  localStorage.getItem(THEME) === Theme.dark
    ? THEME_COLORS.dark.neutral4
    : THEME_COLORS.light.neutral4;

export const BASE_ALL_DATA: TElement = {
  alignment: {},
  background: {
    properties: { alpha: '100', color, format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: BASE_2D,
  deepLevel: 0,
  height: 0,
  id: '-1',
  parentId: '-1',
  position: 'absolute',
  rotate: 0,
  type: ElementType.base,
  width: 0,
};

export const BASE_DYNAMIC_DATA: TElementDynamicData = {
  alignment: {},
  background: BASE_ALL_DATA.background,
  coordinates: BASE_ALL_DATA.coordinates,
  deepLevel: 0,
  height: BASE_ALL_DATA.height,
  id: BASE_ALL_DATA.id,
  position: BASE_ALL_DATA.position,
  rotate: BASE_ALL_DATA.rotate,
  width: BASE_ALL_DATA.width,
};

export const BASE_STATIC_DATA: TElementStaticData = {
  children: BASE_ALL_DATA.children,
  id: BASE_ALL_DATA.id,
  parentId: BASE_ALL_DATA.parentId,
  position: BASE_ALL_DATA.position,
  type: BASE_ALL_DATA.type,
};

export const BASE_PAGE_ELEMENTS: TElementsData = {
  allData: {
    [BASE_ALL_DATA.id]: BASE_ALL_DATA,
  },
  dynamicData: {
    [BASE_DYNAMIC_DATA.id]: BASE_DYNAMIC_DATA,
  },
  staticData: {
    [BASE_STATIC_DATA.id]: BASE_STATIC_DATA,
  },
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
  CHANGE_PARENT,
  CHANGE_POSITION,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  UNSELECT_ELEMENT,
];

export const REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS = [
  CHANGE_BACKGROUND,
  ROTATE_ELEMENT,
  SET_AREA_COORDINATES,
  SET_ELEMENT_COORDINATES,
  SET_ELEMENT_SIZES,
  SET_ELEMENTS_COORDINATES,
];
