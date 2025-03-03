import { FC, useRef } from 'react';

// components
import Elements from './components/Elements/Elements';
import FrameArea from './components/FrameArea/FrameArea';
import { ZoomBox } from 'shared';

// others
import { className, classNames } from './classNames';

// hooks
import { useTheme } from 'hooks';
import { useViewBoxEvents } from './hooks/useViewBoxEvents';

// styles
import styles from './view-box.scss';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates } from 'types';

export type TViewBoxProps = {
  coordinates: T3DCoordinates;
  mouseMode: MouseMode;
  setCoordinates: (coordinates: T3DCoordinates) => void;
  setMouseMode: (mouseMode: MouseMode) => void;
};

const ViewBox: FC<TViewBoxProps> = ({
  coordinates,
  mouseMode,
  setCoordinates,
  setMouseMode,
}) => {
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { frameArea, ...events } = useViewBoxEvents(
    coordinates,
    mouseMode,
    setMouseMode,
  );
  const eventsDisabled = frameArea !== null || mouseMode !== MouseMode.default;

  return (
    <ZoomBox
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.createFrame,
          mouseMode === MouseMode.toolBeltA,
        ]),
      }}
      coordinates={coordinates}
      onMouseMoveDepedencies={[frameArea, mouseMode]}
      onMouseUpDepedencies={[frameArea, mouseMode]}
      setCoordinates={setCoordinates}
      zoomBoxRef={zoomBoxRef}
      {...events}
    >
      <Elements eventsDisabled={eventsDisabled} />
      <FrameArea frameArea={frameArea} />
    </ZoomBox>
  );
};

export default ViewBox;
