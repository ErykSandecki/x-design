import { FC, useRef, useState } from 'react';

// components
import Toolbar from 'components/PageBuilder/components/Toolbar/Toolbar';
import { Box, BASE_3D, ZoomBox } from 'shared';

// hooks
import { useViewBoxEvents } from './hooks/useViewBoxEvents';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates } from 'types';

export type TViewBoxProps = {
  coordinates: T3DCoordinates;
  mouseMode: MouseMode;
  setCoordinates: (coordinates: T3DCoordinates) => void;
};

const ViewBox: FC<TViewBoxProps> = ({
  coordinates,
  mouseMode,
  setCoordinates,
}) => {
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const v = useViewBoxEvents(
    coordinates,
    mouseMode,
    setCoordinates,
    zoomBoxRef,
  );

  return (
    <ZoomBox
      coordinates={coordinates}
      setCoordinates={setCoordinates}
      zoomBoxRef={zoomBoxRef}
    >
      zoombox
    </ZoomBox>
  );
};

export default ViewBox;
