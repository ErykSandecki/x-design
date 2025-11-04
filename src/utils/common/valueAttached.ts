// types
import { TValueExtended } from 'types';

export const valueAttached = (mode: TValueExtended['mode']): boolean => mode === 'auto' || mode === 'variable';
