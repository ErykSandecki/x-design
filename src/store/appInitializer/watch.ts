import { all, AllEffect, ForkEffect, takeEvery } from 'redux-saga/effects';

// store
import { appInit, initLanguage } from './slice';
import { appInitSaga, initLanguageSaga } from './saga';

export function* watchAppInitializer(): Generator<AllEffect<ForkEffect<any>>> {
  yield all([takeEvery([appInit], appInitSaga), takeEvery([initLanguage], initLanguageSaga)]);
}
