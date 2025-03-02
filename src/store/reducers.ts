import { combineReducers, Reducer } from 'redux';

// store
import appInitializer from './appInitializer/reducer';
import pageBuilder from './pageBuilder/reducer';
import reduxHookForm from './reduxHookForm/reducer';

// types
import { TMainState } from 'types/reducers';

const reducers = {
  appInitializer,
  pageBuilder,
  reduxHookForm,
};

const createRootReducer = (): Reducer<TMainState> => combineReducers(reducers);

export default createRootReducer;
