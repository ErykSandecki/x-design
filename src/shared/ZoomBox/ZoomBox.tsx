import { FC, ReactNode, useRef } from 'react';

// components
import Box from '../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';
import { useZoomBoxEvents } from './hooks/useZoomBoxEvents';

// others
import { className, classNames } from './classNames';

// styles
import styles from './zoom-box.scss';

// types
import { T3DCoordinates } from 'types';

export type TZoomBoxProps = {
  children: ReactNode;
  coordinates: T3DCoordinates;
  setCoordinates: (coordinates: T3DCoordinates) => void;
};

export const ZoomBox: FC<TZoomBoxProps> = ({
  children,
  coordinates,
  setCoordinates,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const zoomContentRef = useRef<HTMLDivElement>(null);
  const { cursorState, ...events } = useZoomBoxEvents(
    coordinates,
    setCoordinates,
    zoomBoxRef,
  );

  return (
    <Box
      classes={{
        className: cx(
          classNamesWithTheme[className].name,
          classNamesWithTheme[className].modificators[cursorState],
        ),
      }}
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
