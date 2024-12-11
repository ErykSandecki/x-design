// others
import { REDUCER_KEY as APP_INITIALIZER_REDUCER_KEY } from '../store/appInitializer/actionsType';
import { REDUCER_KEY as REDUX_HOOK_FORM } from '../store/reduxHookForm/actionsType';
import { REDUCER_KEY as ROUTER } from '../store/router/actionsType';

// types
import { TAppInitializerState } from '../store/appInitializer/types';
import { TReduxHookFormState } from '../store/reduxHookForm/types';
import { TRouterState } from '../store/router/types';

export type TMainState = {
  [APP_INITIALIZER_REDUCER_KEY]: TAppInitializerState;
  [REDUX_HOOK_FORM]: TReduxHookFormState;
  [ROUTER]: TRouterState;
};
