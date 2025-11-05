import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Elements from './Elements/Elements';
import MultipleElementsArea from './MultipleElementsArea/MultipleElementsArea';
import OverlayContainer from './OverlayContainer/OverlayContainer';
import SelectableArea from './SelectableArea/SelectableArea';
import { ZoomBox } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { className, classNames } from './classNames';
import { MOUSE_MODE_DISABLED } from 'pages/PageBuilderPage/constants';

// hooks
import { useTheme } from 'hooks';
import { useViewBoxEvents } from './hooks/useViewBoxEvents';

// store
import { eventSelectorCreator, pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';
import { setAreCoordinates } from 'store/pageBuilder/actions';

// styles
import styles from './view-box.scss';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TColor } from 'types';

export type TViewBoxProps = {
  coordinates: T3DCoordinates;
  mouseMode: MouseMode;
  setCoordinates: TFunc<[T3DCoordinates]>;
  setMouseMode: TFunc<[MouseMode]>;
};

const ViewBox: FC<TViewBoxProps> = ({ coordinates, mouseMode, setCoordinates, setMouseMode }) => {
  const colorSampler = useSelector(eventSelectorCreator('colorSampler'));
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const data = background[0].properties as TColor;
  const dispatch = useDispatch();
  const possibleElement = useSelector(eventSelectorCreator('possibleElement'));
  const { zoomBoxRef, zoomContentRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { selectableArea, ...events } = useViewBoxEvents(coordinates, mouseMode, setMouseMode);

  return (
    <ZoomBox
      alpha={data.alpha}
      backgroundColor={data.color}
      backgroundVissible={background[0].visible}
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.createFrame,
          mouseMode === MouseMode.toolBeltA,
        ]),
      }}
      colorSampler={colorSampler as boolean}
      coordinates={coordinates}
      mouseMode={mouseMode}
      onMouseMoveDepedencies={[mouseMode]}
      onMouseUpDepedencies={[mouseMode]}
      onUpdateCoordinates={(coordinates) => dispatch(setAreCoordinates(coordinates))}
      setCoordinates={setCoordinates}
      zoomBoxRef={zoomBoxRef}
      zoomContentRef={zoomContentRef}
      {...events}
    >
      <MultipleElementsArea />
      <Elements
        eventsDisabled={!!possibleElement || MOUSE_MODE_DISABLED.includes(mouseMode)}
        id="-1"
        mouseMode={mouseMode}
        parentId="-1"
      />
      <SelectableArea selectableArea={selectableArea} />
      <OverlayContainer />
    </ZoomBox>
  );
};

export default memo(ViewBox);
