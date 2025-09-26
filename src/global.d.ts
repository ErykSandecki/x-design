import { TFunction } from 'i18next';

export {};

declare global {
  type TFuncion<T = void> = () => T;
  type TT = TFunction;
}
