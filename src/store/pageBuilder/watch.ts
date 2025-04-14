import { all, AllEffect, ForkEffect, takeEvery } from 'redux-saga/effects';

// others
import { CHANGE_PARENT } from './actionsType';

// store
import { freezeEventMoveElements } from './saga';

export function* watchPageBuilder(): Generator<AllEffect<ForkEffect<any>>> {
  yield all([takeEvery([CHANGE_PARENT], freezeEventMoveElements)]);
}
