import { FC, useRef } from 'react';

// components
import Elements from './components/Elements/Elements';
import ElementArea from './components/ElementArea/ElementArea';
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
  const { elementArea, ...events } = useViewBoxEvents(
    coordinates,
    mouseMode,
    setMouseMode,
  );
  const eventsDisabled =
    elementArea !== null || mouseMode !== MouseMode.default;

  return (
    <ZoomBox
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.createFrame,
          mouseMode === MouseMode.toolBeltA,
        ]),
      }}
      coordinates={coordinates}
      onMouseMoveDepedencies={[elementArea, mouseMode]}
      onMouseUpDepedencies={[elementArea, mouseMode]}
      setCoordinates={setCoordinates}
      zoomBoxRef={zoomBoxRef}
      {...events}
    >
      <Elements eventsDisabled={eventsDisabled} mouseMode={mouseMode} />
      <ElementArea elementArea={elementArea} />
    </ZoomBox>
  );
};

export default ViewBox;
