import { Dispatch } from 'redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { MouseMode } from 'types';

export const onEscapeChangeMouseModeHandler = (dispatch: Dispatch, setMouseMode: TFunc<[MouseMode]>): void => {
  setMouseMode(MouseMode.default);
  dispatch(updateEventsStatus({ colorSampler: false }));
};
