import { Store } from 'redux';
import { TFunction } from 'i18next';

// types
import { TAction } from './redux';
import { TMainState } from './reducers';
import { TObject } from './generic/object';

declare global {
  type T2DCoordinates = {
    y: number;
    x: number;
  };
  type T3DCoordinates = T2DCoordinates & {
    z: number;
  };
  type TExtractInnerArray<T> = T extends TObject<infer U> ? U : never;
  type TRectCoordinates = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  type TOffsets = {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  type TFunc<A extends any[] = [], T = void> = (...args: A) => T;
  type TT = TFunction;

  interface Window {
    Cypress?: unknown;
    store?: Store<TMainState, TAction>;
  }
}

export type TFileData = string | ArrayBuffer | null;

export type TSvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
