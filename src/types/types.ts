import { Store } from 'redux';

// types
import { TAction } from './redux';

declare global {
  interface Window {
    Cypress?: unknown;
    store?: Store<any, TAction>;
  }
}

export type TFileData = string | ArrayBuffer | null;
