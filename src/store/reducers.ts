import { combineReducers, Reducer } from '@reduxjs/toolkit';

// store
import appInitializer from './appInitializer/slice';
import pageBuilder from './pageBuilder/slice';
import reduxHookForm from './reduxHookForm/slice';

// types
import { TMainState } from 'types/reducers';

const reducers = {
  appInitializer,
  pageBuilder,
  reduxHookForm,
};

const createRootReducer = (): Reducer<TMainState> => combineReducers(reducers);

export default createRootReducer;
