import { useState } from 'react';

// hooks
import { useMouseMoveEvent } from './useMouseMoveEvent';

// types
import { TRGBA } from 'types';
import { useHandleInitial } from './useHandleInitial';

export type TUseColorSamplerEvents = {
  colors: Array<TRGBA>;
  mousePosition: T2DCoordinates;
  isPending: boolean;
};

export const useColorSamplerEvents = (initialMousePosition: T2DCoordinates): TUseColorSamplerEvents => {
  const [gridColors, setGridColors] = useState<Array<TRGBA>>([]);
  const [isPending, setIsPending] = useState(true);
  const [mousePosition, setMousePosition] = useState<T2DCoordinates>(initialMousePosition);

  useHandleInitial();
  useMouseMoveEvent(initialMousePosition, setGridColors, setMousePosition, setIsPending);

  return { colors: gridColors, isPending, mousePosition };
};
