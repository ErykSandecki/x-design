import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

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
  pages: {
    [BASE_PAGE.id]: {
      ...BASE_PAGE,
    },
  },
};

const handleClearPrevState = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      prevState: undefined,
    },
  },
});

const handleSelectElement = (state: TPageBuilderState, selectedElement: TSelectedElement): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: filterSelectedElements(
        [...state.pages[state.currentPage].selectedElements, selectedElement],
        state,
      ),
    },
  },
});

const handleSelectElements = (state: TPageBuilderState, selectedElements: TSelectedElements): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: filterSelectedElements(selectedElements, state),
    },
  },
});

const handleSetAreaCoordinates = (
  state: TPageBuilderState,
  areaCoordinates: Partial<T3DCoordinates>,
): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      areaCoordinates: {
        ...state.pages[state.currentPage].areaCoordinates,
        ...areaCoordinates,
      },
    },
  },
});

const handleUpdateEventsStatus = (state: TPageBuilderState, events: Partial<TEvents>): TPageBuilderState => ({
  ...state,
  events: {
    ...state.events,
    ...events,
  },
});

const handleUpdatePrevState = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      prevState: state.pages[state.currentPage],
    },
  },
});

const handleUnselectElement = (state: TPageBuilderState, id: TElement['id']): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: state.pages[state.currentPage].selectedElements.filter((element) => element.id !== id),
    },
  },
});

const handleUnselectElements = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: [],
    },
  },
});

const pageBuilderSlice = createSlice({
  initialState,
  name: 'pageBuilder',
  reducers: {
    addElement: (state, action: PayloadAction<TAddELementActionPayload>) =>
      handleAddElement(action.payload, current(state) as TPageBuilderState),
    addVariant: {
      prepare: (key: TAddVariantActionPayload['key'], value: TAddVariantActionPayload['value']) => ({
        payload: { key, value },
      }),
      reducer: (state, action: PayloadAction<TAddVariantActionPayload>) =>
        handleAddVariant(action.payload, current(state) as TPageBuilderState),
    },
    applyElementsType: {
      prepare: (
        mode: TApplyElementsTypeActionPayload['mode'],
        properties: TApplyElementsTypeActionPayload['properties'],
        unit?: TApplyElementsTypeActionPayload['unit'],
      ) => ({ payload: { mode, properties, unit } }),
      reducer: (state, action: PayloadAction<TApplyElementsTypeActionPayload>) =>
        handleApplyElementsType(action.payload, current(state) as TPageBuilderState),
    },
    changeAlignment: (state, action: PayloadAction<TChangeAlignmentActionPayload>) =>
      handleChangeAlignment(action.payload, current(state) as TPageBuilderState),
    changeBackground: {
      prepare: (
        background: TChangeBackgroundActionPayload['background'],
        id: TChangeBackgroundActionPayload['id'],
        index: TChangeBackgroundActionPayload['index'],
      ) => ({ payload: { background, id, index } }),
      reducer: (state, action: PayloadAction<TChangeBackgroundActionPayload>) =>
        handleChangeBackground(action.payload, current(state) as TPageBuilderState),
    },
    changeBackgroundOrder: {
      prepare: (
        draggableItem: TChangeBackgroundOrderActionPayload['draggableItem'],
        position: TChangeBackgroundOrderActionPayload['position'],
      ) => ({ payload: { draggableItem, position } }),
      reducer: (state, action: PayloadAction<TChangeBackgroundOrderActionPayload>) =>
        handleChangeBackgroundOrder(action.payload, current(state) as TPageBuilderState),
    },
    changeLayout: (state, action: PayloadAction<TChangeLayoutActionPayload>) =>
      handleChangeLayout(action.payload, current(state) as TPageBuilderState),
    changeLayoutAlignment: (state, action: PayloadAction<TChangeLayoutAlignmentActionPayload>) =>
      handleChangeLayoutAlignment(action.payload, current(state) as TPageBuilderState),
    changeLayoutBoxSizing: (state, action: PayloadAction<TChangeLayoutBoxSizingActionPayload>) =>
      handleChangeLayoutBoxSizing(action.payload, current(state) as TPageBuilderState),
    changeLayoutGrid: (state, action: PayloadAction<TChangeLayoutGridActionPayload>) =>
      handleChangeLayoutGrid(action.payload, current(state) as TPageBuilderState),
    changeParent: (state) => handleChangeParent(current(state) as TPageBuilderState),
    changePosition: (state) => handleChangePosition(current(state) as TPageBuilderState),
    changeProperties: (state, action: PayloadAction<TChangePropertiesActionPayload>) =>
      handleChangeProperties(action.payload, current(state) as TPageBuilderState),
    clearPrevState: (state) => handleClearPrevState(current(state) as TPageBuilderState),
    fitLayout: (state) => handleFitLayout(current(state) as TPageBuilderState),
    flipElements: (state, action: PayloadAction<TFlipElementsActionPayload>) =>
      handleFlipElements(action.payload, current(state) as TPageBuilderState),
    reducerHistoryRedo: (state) => handleReducerHistoryRedo(current(state) as TPageBuilderState),
    reducerHistorySave: (state, action: PayloadAction<string>) =>
      handleReducerHistorySave(current(state) as TPageBuilderState, action.payload),
    reducerHistoryUndo: (state) => handleReducerHistoryUndo(current(state) as TPageBuilderState),
    removeVariant: {
      prepare: (index: TRemoveVariantActionPayload['index'], key: TRemoveVariantActionPayload['key']) => ({
        payload: { index, key },
      }),
      reducer: (state, action: PayloadAction<TRemoveVariantActionPayload>) =>
        handleRemoveVariant(action.payload, current(state) as TPageBuilderState),
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

        return handleResizeElement(
          baseCoordinates,
          flip,
          height,
          width,
          id,
          mouseCoordinates,
          current(state) as TPageBuilderState,
        );
      },
    },
    rotateElements: (state, action: PayloadAction<TRotateElementsActionPayload>) =>
      handleRotateElements(action.payload, current(state) as TPageBuilderState),
    selectElement: (state, action: PayloadAction<TSelectedElement>) =>
      handleSelectElement(current(state) as TPageBuilderState, action.payload),
    selectElements: (state, action: PayloadAction<TSelectedElements>) =>
      handleSelectElements(current(state) as TPageBuilderState, action.payload),
    setAreCoordinates: (state, action: PayloadAction<Partial<T3DCoordinates>>) =>
      handleSetAreaCoordinates(current(state) as TPageBuilderState, action.payload),
    setElementsCoordinates: {
      prepare: (
        coordinates: TSetElementsCoordinatesActionPayload['coordinates'],
        mode: TSetElementsCoordinatesActionPayload['mode'],
      ) => ({ payload: { coordinates, mode } }),
      reducer: (state, action: PayloadAction<TSetElementsCoordinatesActionPayload>) =>
        handleSetElementsCoordinates(action.payload, current(state) as TPageBuilderState),
    },
    setElementsGap: {
      prepare: (gap: TSetElementsGapActionPayload['gap'], value: TSetElementsGapActionPayload['value']) => ({
        payload: { gap, value },
      }),
      reducer: (state, action: PayloadAction<TSetElementsGapActionPayload>) =>
        handleSetElementsGap(action.payload, current(state) as TPageBuilderState),
    },
    setElementsScoreToCurrentSize: {
      prepare: (
        scoreType: TSetElementsScoreToCurrentSizeActionPayload['scoreType'],
        sizeType: TSetElementsScoreToCurrentSizeActionPayload['sizeType'],
      ) => ({ payload: { scoreType, sizeType } }),
      reducer: (state, action: PayloadAction<TSetElementsScoreToCurrentSizeActionPayload>) => {
        const { scoreType, sizeType } = action.payload;

        return handleSetElementsScoreToCurrentSize(scoreType, sizeType, current(state) as TPageBuilderState);
      },
    },
    setElementsSizes: {
      prepare: (
        sizeType: TSetElementsSizesActionPayload['sizeType'],
        value: TSetElementsSizesActionPayload['value'],
      ) => ({ payload: { sizeType, value } }),
      reducer: (state, action: PayloadAction<TSetElementsSizesActionPayload>) => {
        const { sizeType, value } = action.payload;

        return handleSetElementsSizes(sizeType, current(state) as TPageBuilderState, value);
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

        return handleSetElementsSizesMinMax(scoreType, sizeType, current(state) as TPageBuilderState, value);
      },
    },
    unselectElement: (state, action: PayloadAction<TElement['id']>) =>
      handleUnselectElement(current(state) as TPageBuilderState, action.payload),
    unselectElements: (state) => handleUnselectElements(current(state) as TPageBuilderState),
    updateEventsStatus: (state, action: PayloadAction<Partial<TEvents>>) =>
      handleUpdateEventsStatus(current(state) as TPageBuilderState, action.payload),
    updatePrevState: (state) => handleUpdatePrevState(current(state) as TPageBuilderState),
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
