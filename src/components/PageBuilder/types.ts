// types
import { TRectCoordinates } from 'types';

export type TRectArea = TRectCoordinates | null;
export type TRectAreaExtended = TRectArea & { visible?: boolean };
