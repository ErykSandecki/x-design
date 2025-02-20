import { Store } from 'redux';

// types
import { TAction } from './redux';

export type T2DCoordinates = {
  y: number;
  x: number;
};
export type T3DCoordinates = T2DCoordinates & {
  z: number;
};

declare global {
  interface Window {
    Cypress?: unknown;
    store?: Store<any, TAction>;
  }
}

export type TFileData = string | ArrayBuffer | null;
