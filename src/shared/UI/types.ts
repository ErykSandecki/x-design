// types
import { TObject } from 'types/generic';

export type TClasses = TObject<string>;

export type TUIProps<T extends TClasses> = {
  classes?: T;
};
