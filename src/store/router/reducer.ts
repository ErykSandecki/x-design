// others
import { HISTORY_CHANGED, PUSH, REDIRECT_TO } from './actionsType';

// types
import { TAction } from 'types/redux';
import {
  THistoryChangedAction,
  TPushAction,
  TRedirectToAction,
  TRouterState,
} from './types';
import { RouterAction } from '../../types/router/enums';

const initialState: TRouterState = {
  action: RouterAction.push,
  location: undefined,
  redirectTo: undefined,
};

const historyChanged = (
  state: TRouterState,
  { payload: { action, location } }: TAction<THistoryChangedAction['payload']>,
): TRouterState => ({
  ...state,
  action,
  location,
  redirectTo: undefined,
});

const push = (
  state: TRouterState,
  { payload: to }: TAction<TPushAction['payload']>,
): TRouterState => ({
  ...state,
  redirectTo: {
    action: RouterAction.push,
    to,
  },
});

const redirectTo = (
  state: TRouterState,
  { payload: redirectTo }: TAction<TRedirectToAction['payload']>,
): TRouterState => ({
  ...state,
  redirectTo,
});

const routerReducer = (
  state: TRouterState = initialState,
  action: TAction,
): TRouterState => {
  switch (action.type) {
    case HISTORY_CHANGED:
      return historyChanged(state, action);
    case PUSH:
      return push(state, action);
    case REDIRECT_TO:
      return redirectTo(state, action);
    default:
      return state;
  }
};

export default routerReducer;
