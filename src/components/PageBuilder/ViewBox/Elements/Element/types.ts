import { ReactNode } from 'react';

// types
import { TElement } from 'types';

export type TElementChildren = (
  anlge: TElement['angle'],
  coordinates: TElement['coordinates'],
  height: TElement['height']['value'],
  hover: boolean,
  selected: boolean,
  width: TElement['width']['value'],
) => ReactNode;
