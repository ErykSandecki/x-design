import React, { FC, ReactNode, RefObject, useRef } from 'react';

// components
import Box from '../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';
import { useZoomBoxEvents } from './hooks/useZoomBoxEvents';

// others
import { classes, className, classNames } from './classNames';

// styles
import styles from './zoom-box.scss';

// types
import { T3DCoordinates } from 'types';

export type TZoomBoxProps = {
  children: ReactNode;
  classes?: typeof classes;
  coordinates: T3DCoordinates;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseMoveDepedencies?: Array<any>;
  onMouseUp: (event: MouseEvent) => void;
  onMouseUpDepedencies?: Array<any>;
  onUpdateCoordinates?: (coordinates: T3DCoordinates) => void;
  setCoordinates: (coordinates: T3DCoordinates) => void;
  zoomBoxRef: RefObject<HTMLDivElement>;
};

export const ZoomBox: FC<TZoomBoxProps> = ({
  children,
  classes = { className: '' },
  coordinates,
  onMouseDown,
  onMouseMove,
  onMouseMoveDepedencies = [],
  onMouseUp,
  onMouseUpDepedencies = [],
  onUpdateCoordinates = null,
  setCoordinates,
  zoomBoxRef,
}) => {
  const zoomContentRef = useRef<HTMLDivElement>(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { cursorState, ...events } = useZoomBoxEvents(
    coordinates,
    onMouseDown,
    onMouseMove,
    onMouseMoveDepedencies,
    onMouseUp,
    onMouseUpDepedencies,
    onUpdateCoordinates,
    setCoordinates,
    zoomBoxRef,
  );

  return (
    <Box
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[className].name,
          classNamesWithTheme[className].modificators[cursorState],
        ),
      }}
      e2eValue="zoom-box"
      ref={zoomBoxRef}
      sx={{ bg: 'neutral4', height: '100%', overflow: 'hidden' }}
      {...events}
    >
      <Box
        classes={{ className: cx(classNamesWithTheme.zoomContent) }}
        ref={zoomContentRef}
        sx={{ height: '100vh', position: 'relative' }}
        style={{
          transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ZoomBox;
