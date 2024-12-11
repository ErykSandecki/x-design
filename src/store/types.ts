import { EmptyObject, Store } from 'redux';

// types
import { TAction } from 'types/redux';
import { TMainState } from 'types/reducers';

export type TStore = Store<EmptyObject & TMainState, TAction<any>> & {
  dispatch: unknown;
};
