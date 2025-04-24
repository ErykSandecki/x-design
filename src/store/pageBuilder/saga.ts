import { cancel, delay, fork, put, take } from 'redux-saga/effects';
import { Task } from 'redux-saga';

// others
import { REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS } from './constants';

// store
import { reducerHistorySave, updateEventsStatus } from './actions';

// types
import { TAction } from 'types';
import { TReducerHistorySaveAction } from './types';

export function* freezeEventMoveElements() {
  yield put(updateEventsStatus({ canMoveElements: false }));
  yield delay(100);
  yield put(updateEventsStatus({ canMoveElements: true }));
}

export function* reducerHistorySaveSaga({ type }: TReducerHistorySaveAction) {
  yield put(reducerHistorySave(type));
}

export function* reducerHistorySaveWithDelaySaga({
  type,
}: TReducerHistorySaveAction) {
  const task: Task = yield fork(reducerHistorySaveWithDelayForkedSaga, type);

  yield take(REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS);
  yield cancel(task);
}

export function* reducerHistorySaveWithDelayForkedSaga(type: TAction['type']) {
  yield delay(500);
  yield put(reducerHistorySave(type));
}
