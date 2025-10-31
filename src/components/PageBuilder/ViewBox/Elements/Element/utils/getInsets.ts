// types
import { TInsets } from 'types';

export const getInsets = ({ b, l, r, t }: TInsets): string => `${t.value}px ${r.value}px ${b.value}px ${l.value}px`;
