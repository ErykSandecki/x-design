import { cancel, delay, fork, put, take } from 'redux-saga/effects';
import { Task } from 'redux-saga';

// store
import {
  addElement,
  applyElementsType,
  changeAlignment,
  changeBackground,
  changeLayout,
  changeLayoutAlignment,
  changeLayoutBoxSizing,
  changeLayoutGrid,
  changeParent,
  changePosition,
  changeProperties,
  fitLayout,
  flipElements,
  reducerHistorySave,
  resizeElement,
  rotateElements,
  selectElement,
  selectElements,
  setAreCoordinates,
  setElementsCoordinates,
  setElementsGap,
  setElementsSizesMinMax,
  unselectElement,
  updateEventsStatus,
} from './reducer';

// types
import { TAction } from 'types';

export const REDUCER_HISTORY_SAVE_ACTIONS = [
  addElement,
  applyElementsType,
  changeAlignment,
  changeLayout,
  changeLayoutAlignment,
  changeLayoutBoxSizing,
  changeParent,
  changePosition,
  fitLayout,
  flipElements,
  selectElement,
  selectElements,
  unselectElement,
];

export const REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS = [
  changeBackground,
  changeLayoutGrid,
  changeProperties,
  rotateElements,
  resizeElement,
  setAreCoordinates,
  setElementsCoordinates,
  setElementsGap,
  setElementsSizesMinMax,
];

export function* freezeEventMoveElements(): any {
  yield put(updateEventsStatus({ canMoveElements: false }));
  yield delay(100);
  yield put(updateEventsStatus({ canMoveElements: true }));
}

export function* reducerHistorySaveSaga({ type }: { type: TAction['type'] }): any {
  yield put(reducerHistorySave(type));
}

export function* reducerHistorySaveWithDelaySaga({ type }: { type: TAction['type'] }): any {
  const task: Task = yield fork(reducerHistorySaveWithDelayForkedSaga, type);

  yield take(REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS);
  yield cancel(task);
}

export function* reducerHistorySaveWithDelayForkedSaga(type: TAction['type']): any {
  yield delay(500);
  yield put(reducerHistorySave(type));
}
