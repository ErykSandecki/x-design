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

export type TRectCoordinates = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

declare global {
  interface Window {
    Cypress?: unknown;
    store?: Store<any, TAction>;
  }
}

export type TFileData = string | ArrayBuffer | null;

export type TSvgComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;
