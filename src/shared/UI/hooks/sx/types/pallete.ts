// types
import { Pallete } from '../enums/pallete';
import { TObject } from 'types';
import { TSXColor } from './types';

export type TSXPallete = TObject<TSXColor, typeof Pallete, 'optional'>;
