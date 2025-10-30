// types
import { TInsets } from 'types';

export type TInsetKeysGroup = [keyof Pick<TInsets, 'l' | 't'>, keyof Pick<TInsets, 'b' | 'r'>];
