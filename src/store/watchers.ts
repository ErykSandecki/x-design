import { Saga, SagaMiddleware } from 'redux-saga';

// store

const watchers: Array<Saga<any>> = [];

const sagaMiddlewareRuns = (sagaMiddleware: SagaMiddleware): void => {
  for (const watcher of watchers) {
    sagaMiddleware.run(watcher);
  }
};

export default sagaMiddlewareRuns;
