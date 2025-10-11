import { FC, memo, RefObject } from 'react';

// components
import DropAnchors from './DropAnchors/DropAnchors';
import EventsArea from './EventsArea/EventsArea';
import Outline from './Outline/Outline';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// types
import { MouseMode, TElement, TFlip } from 'types';
import { TElementChildren } from './types';
import { TUseElementSizes } from './hooks/useElementSizes';

// utils
import { getAbsolutePosition } from '../../utils/getAbsolutePosition';

export type TElementChildrenProps = {
  angle: TElement['angle'];
  children: TElementChildren;
  coordinates: T2DCoordinates;
  counterAngle: TElement['angle'];
  displayEventsArea: boolean;
  displayOutline: boolean;
  elementRef: RefObject<HTMLDivElement>;
  flip: TFlip;
  height: TUseElementSizes['height'];
  id: TElement['id'];
  index: number;
  isHover: boolean;
  isSelected: boolean;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  showDropAnchors: boolean;
  width: TUseElementSizes['width'];
  x: number;
  y: number;
};

const ElementChildren: FC<TElementChildrenProps> = ({
  angle,
  children,
  coordinates,
  counterAngle,
  displayEventsArea,
  displayOutline,
  elementRef,
  flip,
  height,
  id,
  index,
  isHover,
  isSelected,
  mouseMode,
  parentId,
  showDropAnchors,
  width,
  x,
  y,
}) => {
  const { itemsRefs, zoomContentRef } = useRefs();
  const { x1, y1 } = getAbsolutePosition(id, itemsRefs, zoomContentRef);

  return (
    <>
      {showDropAnchors && <DropAnchors id={id} index={index} mouseMode={mouseMode} parentId={parentId} />}
      {children(angle, coordinates, height, isHover, isSelected, width)}
      {displayOutline && <Outline angle={angle - counterAngle} height={height} x={x1} y={y1} width={width} />}
      {displayEventsArea && (
        <EventsArea
          angle={angle}
          absoluteCoordinates={{ x: x1, y: y1 }}
          counterAngle={counterAngle}
          elementRef={elementRef}
          flip={flip}
          height={height}
          id={id}
          mouseMode={mouseMode}
          relativeCoordinates={{ x, y }}
          width={width}
        />
      )}
    </>
  );
};

export default memo(ElementChildren);
