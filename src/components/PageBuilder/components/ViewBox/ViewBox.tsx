import { FC, useRef } from 'react';

// components
import Elements from './components/Elements/Elements';
import ElementArea from './components/ElementArea/ElementArea';
import SelectableArea from './components/SelectableArea/SelectableArea';
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
import MultipleElementsArea from './components/MultipleElementsArea/MultipleElementsArea';

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
  const { elementArea, selectableArea, ...events } = useViewBoxEvents(
    coordinates,
    mouseMode,
    setMouseMode,
  );

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
      <Elements
        eventsDisabled={elementArea !== null || mouseMode !== MouseMode.default}
        mouseMode={mouseMode}
      />
      <ElementArea elementArea={elementArea} />
      <MultipleElementsArea mouseMode={mouseMode} />
      <SelectableArea selectableArea={selectableArea} />
    </ZoomBox>
  );
};

export default ViewBox;
