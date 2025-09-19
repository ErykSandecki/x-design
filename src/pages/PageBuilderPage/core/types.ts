import { RefObject } from 'react';

// types
import { TObject } from 'types';

export type TContext = {
  itemsRefs: TObject<HTMLElement | null>;
  overlayContainerRef: RefObject<HTMLDivElement | null>;
  zoomBoxRef: RefObject<HTMLDivElement | null>;
  zoomContentRef: RefObject<HTMLDivElement | null>;
};
