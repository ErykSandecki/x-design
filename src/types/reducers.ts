// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from '../store/reduxHookForm/actionsType';

// types
import { TReduxHookFormState } from '../store/reduxHookForm/types';

export type TMainState = {
  [REDUX_HOOK_FORM]: TReduxHookFormState;
};
