// others
import { REDUCER_KEY as APP_INITIALIZER_REDUCER_KEY } from '../store/appInitializer/actionsType';
import { REDUCER_KEY as REDUX_HOOK_FORM } from '../store/reduxHookForm/actionsType';

// types
import { TAppInitializerState } from '../store/appInitializer/types';
import { TReduxHookFormState } from '../store/reduxHookForm/types';

export type TMainState = {
  [APP_INITIALIZER_REDUCER_KEY]: TAppInitializerState;
  [REDUX_HOOK_FORM]: TReduxHookFormState;
};
