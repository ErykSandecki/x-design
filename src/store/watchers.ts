import { Saga, SagaMiddleware } from 'redux-saga';

// store
import { watchAppInitializer } from './appInitializer/watch';
import { watchPageBuilder } from './pageBuilder/watch';

const watchers: Array<Saga<any>> = [watchAppInitializer, watchPageBuilder];

const sagaMiddlewareRuns = (sagaMiddleware: SagaMiddleware): void => {
  for (const watcher of watchers) {
    sagaMiddleware.run(watcher);
  }
};

export default sagaMiddlewareRuns;
