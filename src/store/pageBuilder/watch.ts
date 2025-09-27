import { all, AllEffect, ForkEffect, takeEvery } from 'redux-saga/effects';

// others
import { CHANGE_PARENT } from './actionsType';
import { REDUCER_HISTORY_SAVE_ACTIONS, REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS } from './constants';

// store
import { freezeEventMoveElements, reducerHistorySaveSaga, reducerHistorySaveWithDelaySaga } from './saga';

export function* watchPageBuilder(): Generator<AllEffect<ForkEffect<any>>> {
  yield all([
    takeEvery([CHANGE_PARENT], freezeEventMoveElements),
    takeEvery(REDUCER_HISTORY_SAVE_ACTIONS, reducerHistorySaveSaga),
    takeEvery(REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS, reducerHistorySaveWithDelaySaga),
  ]);
}
