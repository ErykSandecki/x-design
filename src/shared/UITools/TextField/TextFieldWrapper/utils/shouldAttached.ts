// types
import { TValueExtended } from 'types';

export const shouldAttached = (mode: TValueExtended['mode']): boolean => mode === 'auto' || mode === 'variable';
