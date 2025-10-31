// others
import {
  ADD_ELEMENT,
  APPLY_ELEMENTS_GAP_TYPE,
  APPLY_ELEMENTS_INSET_TYPE,
  APPLY_ELEMENTS_SIZE_TYPE,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_INSETS,
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_ALIGNMENT,
  CHANGE_LAYOUT_BOX_SIZING,
  CHANGE_LAYOUT_GRID,
  CHANGE_PARENT,
  CHANGE_POSITION,
  FIT_LAYOUT,
  FLIP_ELEMENTS,
  RESIZE_ELEMENT,
  ROTATE_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENTS_COORDINATES,
  SET_ELEMENTS_GAP,
  SET_ELEMENTS_SIZES,
  SET_ELEMENTS_SIZES_MIN_MAX,
  TOGGLE_ASPECT_RATIO,
  UNSELECT_ELEMENT,
} from './actionsType';
import { BASE_2D, BASE_3D } from 'shared';
import { THEME_COLORS } from 'constant/themeColors';

// types
import { AlignmentLayout, ElementType, LayoutType, TElement, Theme } from 'types';
import { TElements, TPage } from './types';

// utils
import { getThemePreferences } from 'utils';

const color = getThemePreferences() === Theme.dark ? THEME_COLORS.dark.neutral4 : THEME_COLORS.light.neutral4;

export const BASE_ELEMENTS: TElement = {
  alignment: {},
  angle: 0,
  aspectRatio: false,
  background: {
    properties: { alpha: '100', color, format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: BASE_2D,
  deepLevel: 0,
  flip: { x: false, y: false },
  height: { type: 'fixed', value: 0 },
  id: '-1',
  layout: {
    alignment: AlignmentLayout.none,
    boxSizing: 'excluded',
    gap: { column: { value: 0 }, row: { value: 0 } },
    grid: { columns: 1, rows: 1 },
    type: LayoutType.freeForm,
  },
  padding: { b: { value: 0 }, l: { value: 0 }, r: { value: 0 }, t: { value: 0 } },
  parentId: '-1',
  position: 'absolute',
  type: ElementType.base,
  width: { type: 'fixed', value: 0 },
};

export const BASE_PAGE_ELEMENTS: TElements = {
  [BASE_ELEMENTS.id]: BASE_ELEMENTS,
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
export const PREV_ID = 'prev';

export const REDUCER_HISTORY_SAVE_ACTIONS = [
  ADD_ELEMENT,
  APPLY_ELEMENTS_GAP_TYPE,
  APPLY_ELEMENTS_INSET_TYPE,
  APPLY_ELEMENTS_SIZE_TYPE,
  CHANGE_ALIGNMENT,
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_ALIGNMENT,
  CHANGE_LAYOUT_BOX_SIZING,
  CHANGE_PARENT,
  CHANGE_POSITION,
  FIT_LAYOUT,
  FLIP_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  TOGGLE_ASPECT_RATIO,
  UNSELECT_ELEMENT,
];

export const REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS = [
  CHANGE_BACKGROUND,
  CHANGE_INSETS,
  CHANGE_LAYOUT_GRID,
  ROTATE_ELEMENTS,
  RESIZE_ELEMENT,
  SET_AREA_COORDINATES,
  SET_ELEMENTS_COORDINATES,
  SET_ELEMENTS_GAP,
  SET_ELEMENTS_SIZES,
  SET_ELEMENTS_SIZES_MIN_MAX,
];
