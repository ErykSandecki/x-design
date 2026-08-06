import cx from 'classnames';
import React, { FC, KeyboardEvent, ReactNode, RefObject } from 'react';

// components
import E2EDataAttribute from '../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useZoomBoxEvents } from './hooks/useZoomBoxEvents';

// others
import { CURSOR_STATES } from 'constant/constants';
import { ZOOM_BOX_MODIFICATORS, ZOOM_CONTENT_ID } from './constants';

// styles
import styles from './zoom-box.scss';

// types
import { E2EAttribute, TColor } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { hexToRgb } from 'utils';

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
    <E2EDataAttribute type={E2EAttribute.box} value="zoom-box">
      <div
        className={cx(
          classes.className,
          styles.ZoomBox,
          styles[ZOOM_BOX_MODIFICATORS[cursorState]],
          styles[ZOOM_BOX_MODIFICATORS[mouseMode]],
          {
            [styles['ZoomBox--color-sampler']]: colorSampler,
            [styles['ZoomBox--pressing']]: mouseMode === MouseMode.move && cursorState === CURSOR_STATES[1],
          },
        )}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ref={zoomBoxRef}
        tabIndex={0}
        {...events}
      >
        <E2EDataAttribute type={E2EAttribute.box} value="zoom-box-background-mask">
          <div
            className={cx(styles['ZoomBox__background-mask'])}
            style={{
              backgroundColor: hexToRgb(backgroundColor, parseInt(alpha)),
              display: backgroundVissible ? 'initial' : 'none',
            }}
          />
        </E2EDataAttribute>
        <div
          className={cx(styles['ZoomBox__texture-blank'])}
          style={{
            transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
          }}
        />
        <div
          className={cx(styles['ZoomBox__zoom-content'])}
          id={ZOOM_CONTENT_ID}
          ref={zoomContentRef}
          style={{
            transform: `translate(${coordinates.x}px, ${coordinates.y}px) scale(${coordinates.z})`,
          }}
        >
          {children}
        </div>
      </div>
    </E2EDataAttribute>
  );
};

export default ZoomBox;
