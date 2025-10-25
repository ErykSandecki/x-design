// others
import { CSSProperties } from 'react';

// types
import { TElement } from 'types';

export const getBoxSizing = (boxSizing: TElement['layout']['boxSizing']): CSSProperties['boxSizing'] =>
  boxSizing === 'included' ? 'border-box' : 'content-box';
