import { Saga, SagaMiddleware } from 'redux-saga';

// store
import { watchAppInitializer } from './appInitializer/watch';

const watchers: Array<Saga<any>> = [watchAppInitializer];

const sagaMiddlewareRuns = (sagaMiddleware: SagaMiddleware): void => {
  for (const watcher of watchers) {
    sagaMiddleware.run(watcher);
  }
};

export default sagaMiddlewareRuns;
