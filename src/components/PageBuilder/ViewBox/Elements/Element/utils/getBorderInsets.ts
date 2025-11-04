// types
import { CSSProperties } from 'react';
import { TInsets } from 'types';

export const getBorderInsets = ({ b, l, r, t }: TInsets): CSSProperties => ({
  borderBottomLeftRadius: `${r.value}${r.unit ?? 'px'}`,
  borderBottomRightRadius: `${b.value}${b.unit ?? 'px'}`,
  borderTopLeftRadius: `${l.value}${l.unit ?? 'px'}`,
  borderTopRightRadius: `${t.value}${t.unit ?? 'px'}`,
});
