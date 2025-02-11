import { CombinedState, combineReducers, Reducer } from 'redux';

// store
import appInitializer from './appInitializer/reducer';
import reduxHookForm from './reduxHookForm/reducer';

// types
import { TAction } from 'types/redux';
import { TMainState } from 'types/reducers';

const reducers = {
  appInitializer,
  reduxHookForm,
};

const createRootReducer = (): Reducer<
  CombinedState<TMainState>,
  TAction<any>
> => combineReducers(reducers);

export default createRootReducer;
