// types
import { TInsets } from 'types';

export const getPaddings = ({ b, l, r, t }: TInsets): string => `${t}px ${r}px ${b}px ${l}px`;
