import { Path as TPath } from 'history';

import { RouterAction } from './enums';

export type TLocation = {
  pathname: string;
  search: string;
  query: Record<string, string>;
};

export type TRedirectTo = {
  action: RouterAction;
  to: Omit<TPath, 'hash'> | string;
};
