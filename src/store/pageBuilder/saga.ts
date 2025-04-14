import { delay, put } from 'redux-saga/effects';

// store
import { updateEventsStatus } from './actions';

export function* freezeEventMoveElements() {
  yield put(updateEventsStatus({ canMoveElements: false }));
  yield delay(100);
  yield put(updateEventsStatus({ canMoveElements: true }));
}
