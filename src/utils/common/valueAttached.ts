// types
import { TValueExtended } from 'types';

export const valueAttached = (isMixedMode: boolean, mode: TValueExtended['mode']): boolean =>
  isMixedMode || mode === 'auto' || mode === 'variable';
