import { useState } from 'react';

// hooks
import { useMouseMoveEvent } from './useMouseMoveEvent';

// types
import { T2DCoordinates, TRGBA } from 'types';

export type TUseColorSamplerEvents = {
  colors: Array<TRGBA>;
  mousePosition: T2DCoordinates;
  isPending: boolean;
};

export const useColorSamplerEvents = (
  active: boolean,
  initialMousePosition: T2DCoordinates,
): TUseColorSamplerEvents => {
  const [gridColors, setGridColors] = useState<Array<TRGBA>>([]);
  const [isPending, setIsPending] = useState(false);
  const [mousePosition, setMousePosition] =
    useState<T2DCoordinates>(initialMousePosition);

  useMouseMoveEvent(active, setGridColors, setMousePosition, setIsPending);

  return { colors: gridColors, isPending, mousePosition };
};
