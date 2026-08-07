import createSagaMiddleware from 'redux-saga';
import { configureStore as configureReduxStore } from '@reduxjs/toolkit';

// store
import reducers from './reducers';
import sagaMiddlewareRuns from './watchers';

// types
import { TStore } from './types';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = (preloadedState = {}): TStore => {
  const store = configureReduxStore({
    devTools: { trace: true },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    preloadedState,
    reducer: reducers(),
  });

  sagaMiddlewareRuns(sagaMiddleware);

  return store;
};

export const store = configureStore();
