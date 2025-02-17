// types
import { Border, BorderColor } from '../enums/borders';
import { TObject } from 'types';
import { TSXColor } from './types';

export type TSXBorders = TObject<number | string, typeof Border, 'optional'> &
  TObject<TSXColor, typeof BorderColor, 'optional'> & {
    borderRadius?: number | string;
  };
