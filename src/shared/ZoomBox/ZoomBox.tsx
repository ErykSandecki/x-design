import { FC, useRef } from 'react';

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
  coordinates: T3DCoordinates;
  setCoordinates: (coordinates: T3DCoordinates) => void;
};

export const ZoomBox: FC<TZoomBoxProps> = ({ coordinates, setCoordinates }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const zoomContentRef = useRef<HTMLDivElement>(null);
  const events = useZoomBoxEvents(coordinates, setCoordinates, zoomBoxRef);
  const { x, y, z } = coordinates;

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      ref={zoomBoxRef}
      sx={{ bg: 'neutral4', height: '100%', overflow: 'hidden' }}
      {...events}
    >
      <Box
        classes={{ className: cx(classNamesWithTheme.zoomContent) }}
        ref={zoomContentRef}
        sx={{ bg: 'neutral3', height: '100vh', position: 'relative' }}
        style={{ transform: `translate(${x}px, ${y}px) scale(${z})` }}
      >
        <div
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            left: '250px',
            top: '500px',
          }}
        >
          ZOOOM
        </div>
      </Box>
    </Box>
  );
};

export default ZoomBox;
