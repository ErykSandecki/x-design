import { combineReducers, Reducer } from 'redux';

// store
import reduxHookForm from './reduxHookForm/reducer';

// types
import { TMainState } from 'types/reducers';

const reducers = {
  reduxHookForm,
};

const createRootReducer = (): Reducer<TMainState> => combineReducers(reducers);

export default createRootReducer;
