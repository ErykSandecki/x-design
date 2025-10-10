import React, { FC, KeyboardEvent, ReactNode, RefObject } from 'react';

// components
import Box from '../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';
import { useZoomBoxEvents } from './hooks/useZoomBoxEvents';

// others
import { CURSOR_STATES } from 'constant/constants';
import { classes, className, classNames } from './classNames';
import { ZOOM_CONTENT_ID } from './constants';

// styles
import styles from './zoom-box.scss';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TColor } from 'types';

// utils
import { hexToRgb } from 'utils';

export type TZoomBoxProps = {
  alpha: string;
  backgroundColor: TColor['color'];
  backgroundVissible: boolean;
  children: ReactNode;
  classes?: typeof classes;
  colorSampler: boolean;
  coordinates: T3DCoordinates;
  mouseMode: MouseMode;
  onKeyDown: TFunc<[KeyboardEvent]>;
  onKeyUp: TFunc;
  onMouseDown: TFunc<[React.MouseEvent]>;
  onMouseMove: TFunc<[MouseEvent]>;
  onMouseMoveDepedencies?: Array<any>;
  onMouseUp: TFunc<[MouseEvent]>;
  onMouseUpDepedencies?: Array<any>;
  onUpdateCoordinates?: TFunc<[T3DCoordinates]>;
  setCoordinates: TFunc<[T3DCoordinates]>;
  zoomBoxRef: RefObject<HTMLDivElement>;
  zoomContentRef: RefObject<HTMLDivElement>;
};

export const ZoomBox: FC<TZoomBoxProps> = ({
  alpha,
  backgroundColor,
  backgroundVissible,
  children,
  classes = { className: '' },
  colorSampler,
  coordinates,
  mouseMode,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseMove,
  onMouseMoveDepedencies = [],
  onMouseUp,
  onMouseUpDepedencies = [],
  onUpdateCoordinates = null,
  setCoordinates,
  zoomBoxRef,
  zoomContentRef,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const { cursorState, ...events } = useZoomBoxEvents(
    coordinates,
    mouseMode,
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
          [classNamesWithTheme[className].modificators.colorSampler, colorSampler],
          classNamesWithTheme[className].modificators[cursorState],
          classNamesWithTheme[className].modificators[mouseMode],
          [
            classNamesWithTheme[className].modificators.pressing,
            mouseMode === MouseMode.move && cursorState === CURSOR_STATES[1],
          ],
        ),
      }}
      e2eValue="zoom-box"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      ref={zoomBoxRef}
      tabIndex={0}
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
      {...events}
    >
      <Box
        classes={{ className: cx(classNamesWithTheme.backgroundMask) }}
        style={{
          backgroundColor: hexToRgb(backgroundColor, parseInt(alpha)),
          display: backgroundVissible ? 'initial' : 'none',
        }}
      />
      <Box
        classes={{ className: cx(classNamesWithTheme.textureBlank) }}
        style={{
          transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
        }}
      />
      <Box
        classes={{ className: cx(classNamesWithTheme.zoomContent) }}
        id={ZOOM_CONTENT_ID}
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
