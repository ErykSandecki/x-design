import cx from 'classnames';
import React, { FC, KeyboardEvent, ReactNode, RefObject } from 'react';

// components
import Box from '../UI/Box/Box';

// hooks
import { useZoomBoxEvents } from './hooks/useZoomBoxEvents';

// others
import { CURSOR_STATES } from 'constant/constants';
import { ZOOM_CONTENT_ID } from './constants';

// styles
import styles from './zoom-box.scss';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TColor } from 'types';

// utils
import { hexToRgb } from 'utils';

const zoomBoxModificators: Record<string, string> = {
  colorSampler: 'ZoomBox--color-sampler',
  comment: 'ZoomBox--comment',
  default: 'ZoomBox--default',
  idle: 'ZoomBox--idle',
  lmb: 'ZoomBox--lmb',
  mmb: 'ZoomBox--mmb',
  move: 'ZoomBox--move',
  pressing: 'ZoomBox--pressing',
  rmb: 'ZoomBox--rmb',
  toolBeltA: 'ZoomBox--toolBeltA',
  unknown: 'ZoomBox--unknown',
};

export type TZoomBoxProps = {
  alpha: string;
  backgroundColor: TColor['color'];
  backgroundVissible: boolean;
  children: ReactNode;
  classes?: { className: string };
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
          styles.ZoomBox,
          styles[zoomBoxModificators[cursorState]],
          styles[zoomBoxModificators[mouseMode]],
          {
            [styles['ZoomBox--color-sampler']]: colorSampler,
            [styles['ZoomBox--pressing']]: mouseMode === MouseMode.move && cursorState === CURSOR_STATES[1],
          },
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
        classes={{ className: cx(styles['ZoomBox__background-mask']) }}
        e2eValue="zoom-box-background-mask"
        style={{
          backgroundColor: hexToRgb(backgroundColor, parseInt(alpha)),
          display: backgroundVissible ? 'initial' : 'none',
        }}
      />
      <Box
        classes={{ className: cx(styles['ZoomBox__texture-blank']) }}
        style={{
          transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
        }}
      />
      <Box
        classes={{ className: cx(styles['ZoomBox__zoom-content']) }}
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
