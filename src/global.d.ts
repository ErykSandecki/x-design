import { TFunction } from 'i18next';

export {};

declare global {
  type TFuncion<A extends any[] = [], T = void> = (...args: A) => T;
  type TT = TFunction;
}
