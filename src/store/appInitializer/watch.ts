import { all, AllEffect, ForkEffect, takeEvery } from 'redux-saga/effects';

// others
import { APP_INIT, INIT_LANGUAGE } from './actionsType';

// store
import { appInitSaga, initLanguageSaga } from './saga';

export function* watchAppInitializer(): Generator<AllEffect<ForkEffect<any>>> {
  yield all([
    takeEvery([APP_INIT], appInitSaga),
    takeEvery([INIT_LANGUAGE], initLanguageSaga),
  ]);
}
