// others
import { REDUCER_KEY as APP_INITIALIZER_REDUCER_KEY } from '../store/appInitializer/slice';
import { REDUCER_KEY as PAGE_BUILDER_REDUCER_KEY } from '../store/pageBuilder/slice';
import { REDUCER_KEY as REDUX_HOOK_FORM } from '../store/reduxHookForm/slice';

// types
import { TAppInitializerState } from '../store/appInitializer/types';
import { TPageBuilderState } from '../store/pageBuilder/types';
import { TReduxHookFormState } from '../store/reduxHookForm/types';

export type TMainState = {
  [APP_INITIALIZER_REDUCER_KEY]: TAppInitializerState;
  [PAGE_BUILDER_REDUCER_KEY]: TPageBuilderState;
  [REDUX_HOOK_FORM]: TReduxHookFormState;
};
