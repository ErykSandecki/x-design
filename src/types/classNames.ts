// types
import { TObject } from 'types';

export type TModificators = TObject<string>;

export type TClassNameWithModificator = {
  name: string;
  modificators: TModificators;
};

export type TClassName = string | TClassNameWithModificator;

export type TClassNames = TObject<TClassName>;
