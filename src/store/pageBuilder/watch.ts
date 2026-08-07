import { all, AllEffect, ForkEffect, takeEvery } from 'redux-saga/effects';

// store
import { changeParent } from './slice';
import {
  freezeEventMoveElements,
  reducerHistorySaveSaga,
  reducerHistorySaveWithDelaySaga,
  REDUCER_HISTORY_SAVE_ACTIONS,
  REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS,
} from './saga';

export function* watchPageBuilder(): Generator<AllEffect<ForkEffect<any>>> {
  yield all([
    takeEvery([changeParent], freezeEventMoveElements),
    takeEvery(REDUCER_HISTORY_SAVE_ACTIONS, reducerHistorySaveSaga),
    takeEvery(REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS, reducerHistorySaveWithDelaySaga),
  ]);
}
