// types
import { TObject } from 'types';
import { TSX } from './hooks/sx/types/types';

export type TClasses = TObject<string>;

export type TUIProps<T extends TClasses> = {
  classes?: T;
  sx?: TSX;
};
