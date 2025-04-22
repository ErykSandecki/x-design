import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Elements from './components/Elements/Elements';
import ElementArea from './components/ElementArea/ElementArea';
import MultipleElementsArea from './components/MultipleElementsArea/MultipleElementsArea';
import SelectableArea from './components/SelectableArea/SelectableArea';
import { ZoomBox } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { className, classNames } from './classNames';
import { OVERLAY_CONTAINER_ID } from './constants';

// hooks
import { useTheme } from 'hooks';
import { useViewBoxEvents } from './hooks/useViewBoxEvents';

// store
import { pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';
import { setAreCoordinates } from 'store/pageBuilder/actions';

// styles
import styles from './view-box.scss';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates, TColor } from 'types';

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
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const data = background.properties as TColor;
  const dispatch = useDispatch();
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const { overlayContainerRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { elementArea, selectableArea, ...events } = useViewBoxEvents(
    coordinates,
    mouseMode,
    setMouseMode,
  );

  return (
    <ZoomBox
      alpha={data.alpha}
      backgroundColor={data.color}
      backgroundVissible={background.visible}
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.createFrame,
          mouseMode === MouseMode.toolBeltA,
        ]),
      }}
      coordinates={coordinates}
      mouseMode={mouseMode}
      onMouseMoveDepedencies={[elementArea, mouseMode]}
      onMouseUpDepedencies={[elementArea, mouseMode]}
      onUpdateCoordinates={(coordinates) =>
        dispatch(setAreCoordinates(coordinates))
      }
      setCoordinates={setCoordinates}
      zoomBoxRef={zoomBoxRef}
      {...events}
    >
      <MultipleElementsArea />
      <Elements
        eventsDisabled={elementArea !== null || mouseMode !== MouseMode.default}
        mouseMode={mouseMode}
        parentId="-1"
      />
      <ElementArea elementArea={elementArea} />
      <SelectableArea selectableArea={selectableArea} />
      <div
        className={cx(classNamesWithTheme.overlayContainer)}
        id={OVERLAY_CONTAINER_ID}
        ref={overlayContainerRef}
      />
    </ZoomBox>
  );
};

export default ViewBox;
