import { Path as TPath } from 'history';

// others
import { HISTORY_CHANGED, PUSH, REDIRECT_TO } from './actionsType';

// types
import { RouterAction } from '../../types/router/enums';

export type TLocation = {
  pathname: string;
  search: string;
  query: Record<string, string>;
};

export type TRedirectTo = {
  action: RouterAction;
  to: Omit<TPath, 'hash'> | string;
};

export type TRouterState = {
  action: RouterAction;
  location: TLocation;
  redirectTo?: TRedirectTo;
};

export type THistoryChangedActionPayload = {
  action: TRouterState['action'];
  location: TRouterState['location'];
};

export type THistoryChangedAction = {
  payload: THistoryChangedActionPayload;
  type: typeof HISTORY_CHANGED;
};

export type TPushAction = {
  payload: TRedirectTo['to'];
  type: typeof PUSH;
};

export type TRedirectToAction = {
  payload: TRedirectTo;
  type: typeof REDIRECT_TO;
};
