import { createSlice, original, PayloadAction } from '@reduxjs/toolkit';

// others
import { BASE_PAGE } from './constants';

// types
import { AnchorResize, AnchorRotate } from './enums';
import { KeyboardKeys, TElement } from 'types';
import {
  TAddELementActionPayload,
  TAddVariantActionPayload,
  TApplyElementsTypeActionPayload,
  TChangeAlignmentActionPayload,
  TChangeBackgroundActionPayload,
  TChangeBackgroundOrderActionPayload,
  TChangeLayoutActionPayload,
  TChangeLayoutAlignmentActionPayload,
  TChangeLayoutBoxSizingActionPayload,
  TChangeLayoutGridActionPayload,
  TChangePropertiesActionPayload,
  TEvents,
  TFlipElementsActionPayload,
  TPageBuilderState,
  TRemoveVariantActionPayload,
  TResizeElementActionPayload,
  TRotateElementsActionPayload,
  TSelectedElement,
  TSelectedElements,
  TSetElementsCoordinatesActionPayload,
  TSetElementsGapActionPayload,
  TSetElementsScoreToCurrentSizeActionPayload,
  TSetElementsSizesActionPayload,
  TSetElementsSizesMinMaxActionPayload,
} from './types';

// utils
import { filterSelectedElements } from './utils/filterSelectedElements';
import { handleAddElement } from './utils/handleAddElement';
import { handleAddVariant } from './utils/handleAddVariant';
import { handleApplyElementsType } from './utils/applyElementsType/handleApplyElementsType';
import { handleChangeAlignment } from './utils/changeAligment/handleChangeAlignment';
import { handleChangeBackground } from './utils/handleChangeBackground';
import { handleChangeBackgroundOrder } from './utils/handleChangeBackgroundOrder';
import { handleChangeLayout } from './utils/changeLayout/handleChangeLayout';
import { handleChangeLayoutAlignment } from './utils/handleChangeLayoutAlignment';
import { handleChangeLayoutBoxSizing } from './utils/handleChangeLayoutBoxSizing';
import { handleChangeLayoutGrid } from './utils/changeLayoutGrid/handleChangeLayoutGrid';
import { handleChangeParent } from './utils/changeParent/handleChangeParent';
import { handleChangePosition } from './utils/handleChangePosition';
import { handleChangeProperties } from './utils/handleChangeProperties';
import { handleFitLayout } from './utils/handleFitLayout';
import { handleFlipElements } from './utils/flipElements/handleFlipElements';
import { handleReducerHistoryRedo } from './utils/reducerHistory/handleReducerHistoryRedo';
import { handleReducerHistorySave } from './utils/reducerHistory/handleReducerHistorySave';
import { handleReducerHistoryUndo } from './utils/reducerHistory/handleReducerHistoryUndo';
import { handleRemoveVariant } from './utils/handleRemoveVariant';
import { handleResizeElement } from './utils/resizeElement/handleResizeElement';
import { handleRotateElements } from './utils/handleRotateElements';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';
import { handleSetElementsGap } from './utils/handleSetElementsGap';
import { handleSetElementsScoreToCurrentSize } from './utils/handleSetElementsScoreToCurrentSize';
import { handleSetElementsSizes } from './utils/setElementSizes/handleSetElementsSizes';
import { handleSetElementsSizesMinMax } from './utils/handleSetElementsSizesMinMax';

const initialState: TPageBuilderState = {
  currentPage: '0',
  events: {
    canMoveElements: true,
    colorSampler: false,
    draggableElements: [],
    hoverOnElement: '-1',
    isGridDropArea: false,
    isMultipleMoving: false,
    isResizing: false,
    isRotating: false,
    possibleAnchorElementId: '-1',
    possibleAnchorPosition: null,
    possibleElement: undefined,
    possibleIndexPosition: null,
    possibleParent: null,
    pressedKey: KeyboardKeys.none,
    selectedAnchorResize: AnchorResize.none,
    selectedAnchorRotate: AnchorRotate.none,
  },
  isLoading: true,
  isPending: false,
  // @ts-ignore
  pages: {
    [BASE_PAGE.id]: {
      ...BASE_PAGE,
    },
  },
};

const handleClearPrevState = (state: TPageBuilderState): void => {
  state.pages[state.currentPage].prevState = undefined;
};

const handleSelectElement = (state: TPageBuilderState, selectedElement: TSelectedElement): void => {
  const currentPage = state.pages[state.currentPage];

  currentPage.selectedElements = filterSelectedElements([...currentPage.selectedElements, selectedElement], state);
};

const handleSelectElements = (state: TPageBuilderState, selectedElements: TSelectedElements): void => {
  state.pages[state.currentPage].selectedElements = filterSelectedElements(selectedElements, state);
};

const handleSetAreaCoordinates = (state: TPageBuilderState, areaCoordinates: Partial<T3DCoordinates>): void => {
  const currentPage = state.pages[state.currentPage];

  currentPage.areaCoordinates = {
    ...currentPage.areaCoordinates,
    ...areaCoordinates,
  };
};

const handleUpdateEventsStatus = (state: TPageBuilderState, events: Partial<TEvents>): void => {
  state.events = {
    ...state.events,
    ...events,
  };
};

const handleUpdatePrevState = (state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];

  // original() snapshots the page as it was before this action, avoiding a
  // self-referencing draft (currentPage.prevState = currentPage would alias itself)
  currentPage.prevState = original(currentPage);
};

const handleUnselectElement = (state: TPageBuilderState, id: TElement['id']): void => {
  const currentPage = state.pages[state.currentPage];

  currentPage.selectedElements = currentPage.selectedElements.filter((element) => element.id !== id);
};

const handleUnselectElements = (state: TPageBuilderState): void => {
  state.pages[state.currentPage].selectedElements = [];
};

const pageBuilderSlice = createSlice({
  initialState,
  name: 'pageBuilder',
  reducers: {
    addElement: (state, action: PayloadAction<TAddELementActionPayload>) => handleAddElement(action.payload, state),
    addVariant: {
      prepare: (key: TAddVariantActionPayload['key'], value: TAddVariantActionPayload['value']) => ({
        payload: { key, value },
      }),
      reducer: (state, action: PayloadAction<TAddVariantActionPayload>) => handleAddVariant(action.payload, state),
    },
    applyElementsType: {
      prepare: (
        mode: TApplyElementsTypeActionPayload['mode'],
        properties: TApplyElementsTypeActionPayload['properties'],
        unit?: TApplyElementsTypeActionPayload['unit'],
      ) => ({ payload: { mode, properties, unit } }),
      reducer: (state, action: PayloadAction<TApplyElementsTypeActionPayload>) =>
        handleApplyElementsType(action.payload, state),
    },
    changeAlignment: (state, action: PayloadAction<TChangeAlignmentActionPayload>) =>
      handleChangeAlignment(action.payload, state),
    changeBackground: {
      prepare: (
        background: TChangeBackgroundActionPayload['background'],
        id: TChangeBackgroundActionPayload['id'],
        index: TChangeBackgroundActionPayload['index'],
      ) => ({ payload: { background, id, index } }),
      reducer: (state, action: PayloadAction<TChangeBackgroundActionPayload>) =>
        handleChangeBackground(action.payload, state),
    },
    changeBackgroundOrder: {
      prepare: (
        draggableItem: TChangeBackgroundOrderActionPayload['draggableItem'],
        position: TChangeBackgroundOrderActionPayload['position'],
      ) => ({ payload: { draggableItem, position } }),
      reducer: (state, action: PayloadAction<TChangeBackgroundOrderActionPayload>) =>
        handleChangeBackgroundOrder(action.payload, state),
    },
    changeLayout: (state, action: PayloadAction<TChangeLayoutActionPayload>) =>
      handleChangeLayout(action.payload, state),
    changeLayoutAlignment: (state, action: PayloadAction<TChangeLayoutAlignmentActionPayload>) =>
      handleChangeLayoutAlignment(action.payload, state),
    changeLayoutBoxSizing: (state, action: PayloadAction<TChangeLayoutBoxSizingActionPayload>) =>
      handleChangeLayoutBoxSizing(action.payload, state),
    changeLayoutGrid: (state, action: PayloadAction<TChangeLayoutGridActionPayload>) =>
      handleChangeLayoutGrid(action.payload, state),
    changeParent: (state) => handleChangeParent(state),
    changePosition: (state) => handleChangePosition(state),
    changeProperties: (state, action: PayloadAction<TChangePropertiesActionPayload>) =>
      handleChangeProperties(action.payload, state),
    clearPrevState: (state) => handleClearPrevState(state),
    fitLayout: (state) => handleFitLayout(state),
    flipElements: (state, action: PayloadAction<TFlipElementsActionPayload>) =>
      handleFlipElements(action.payload, state),
    reducerHistoryRedo: (state) => handleReducerHistoryRedo(state),
    reducerHistorySave: (state, action: PayloadAction<string>) => handleReducerHistorySave(state, action.payload),
    reducerHistoryUndo: (state) => handleReducerHistoryUndo(state),
    removeVariant: {
      prepare: (index: TRemoveVariantActionPayload['index'], key: TRemoveVariantActionPayload['key']) => ({
        payload: { index, key },
      }),
      reducer: (state, action: PayloadAction<TRemoveVariantActionPayload>) =>
        handleRemoveVariant(action.payload, state),
    },
    resizeElement: {
      prepare: (
        baseCoordinates: TResizeElementActionPayload['baseCoordinates'],
        flip: TResizeElementActionPayload['flip'],
        height: TResizeElementActionPayload['height'],
        id: TResizeElementActionPayload['id'],
        mouseCoordinates: TResizeElementActionPayload['mouseCoordinates'],
        width: TResizeElementActionPayload['width'],
      ) => ({ payload: { baseCoordinates, flip, height, id, mouseCoordinates, width } }),
      reducer: (state, action: PayloadAction<TResizeElementActionPayload>) => {
        const { baseCoordinates, flip, height, id, mouseCoordinates, width } = action.payload;

        handleResizeElement(baseCoordinates, flip, height, width, id, mouseCoordinates, state);
      },
    },
    rotateElements: (state, action: PayloadAction<TRotateElementsActionPayload>) =>
      handleRotateElements(action.payload, state),
    selectElement: (state, action: PayloadAction<TSelectedElement>) => handleSelectElement(state, action.payload),
    selectElements: (state, action: PayloadAction<TSelectedElements>) => handleSelectElements(state, action.payload),
    setAreCoordinates: (state, action: PayloadAction<Partial<T3DCoordinates>>) =>
      handleSetAreaCoordinates(state, action.payload),
    setElementsCoordinates: {
      prepare: (
        coordinates: TSetElementsCoordinatesActionPayload['coordinates'],
        mode: TSetElementsCoordinatesActionPayload['mode'],
      ) => ({ payload: { coordinates, mode } }),
      reducer: (state, action: PayloadAction<TSetElementsCoordinatesActionPayload>) =>
        handleSetElementsCoordinates(action.payload, state),
    },
    setElementsGap: {
      prepare: (gap: TSetElementsGapActionPayload['gap'], value: TSetElementsGapActionPayload['value']) => ({
        payload: { gap, value },
      }),
      reducer: (state, action: PayloadAction<TSetElementsGapActionPayload>) =>
        handleSetElementsGap(action.payload, state),
    },
    setElementsScoreToCurrentSize: {
      prepare: (
        scoreType: TSetElementsScoreToCurrentSizeActionPayload['scoreType'],
        sizeType: TSetElementsScoreToCurrentSizeActionPayload['sizeType'],
      ) => ({ payload: { scoreType, sizeType } }),
      reducer: (state, action: PayloadAction<TSetElementsScoreToCurrentSizeActionPayload>) => {
        const { scoreType, sizeType } = action.payload;

        handleSetElementsScoreToCurrentSize(scoreType, sizeType, state);
      },
    },
    setElementsSizes: {
      prepare: (
        sizeType: TSetElementsSizesActionPayload['sizeType'],
        value: TSetElementsSizesActionPayload['value'],
      ) => ({ payload: { sizeType, value } }),
      reducer: (state, action: PayloadAction<TSetElementsSizesActionPayload>) => {
        const { sizeType, value } = action.payload;

        handleSetElementsSizes(sizeType, state, value);
      },
    },
    setElementsSizesMinMax: {
      prepare: (
        scoreType: TSetElementsSizesMinMaxActionPayload['scoreType'],
        sizeType: TSetElementsSizesMinMaxActionPayload['sizeType'],
        value: TSetElementsSizesMinMaxActionPayload['value'],
      ) => ({ payload: { scoreType, sizeType, value } }),
      reducer: (state, action: PayloadAction<TSetElementsSizesMinMaxActionPayload>) => {
        const { scoreType, sizeType, value } = action.payload;

        handleSetElementsSizesMinMax(scoreType, sizeType, state, value);
      },
    },
    unselectElement: (state, action: PayloadAction<TElement['id']>) => handleUnselectElement(state, action.payload),
    unselectElements: (state) => handleUnselectElements(state),
    updateEventsStatus: (state, action: PayloadAction<Partial<TEvents>>) =>
      handleUpdateEventsStatus(state, action.payload),
    updatePrevState: (state) => handleUpdatePrevState(state),
  },
});

export const {
  addElement,
  addVariant,
  applyElementsType,
  changeAlignment,
  changeBackground,
  changeBackgroundOrder,
  changeLayout,
  changeLayoutAlignment,
  changeLayoutBoxSizing,
  changeLayoutGrid,
  changeParent,
  changePosition,
  changeProperties,
  clearPrevState,
  fitLayout,
  flipElements,
  reducerHistoryRedo,
  reducerHistorySave,
  reducerHistoryUndo,
  removeVariant,
  resizeElement,
  rotateElements,
  selectElement,
  selectElements,
  setAreCoordinates,
  setElementsCoordinates,
  setElementsGap,
  setElementsScoreToCurrentSize,
  setElementsSizes,
  setElementsSizesMinMax,
  unselectElement,
  unselectElements,
  updateEventsStatus,
  updatePrevState,
} = pageBuilderSlice.actions;
export const REDUCER_KEY = pageBuilderSlice.name;
export default pageBuilderSlice.reducer;
