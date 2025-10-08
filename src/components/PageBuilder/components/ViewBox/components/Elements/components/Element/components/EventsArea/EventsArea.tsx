import { createPortal } from 'react-dom';
import { FC, memo, RefObject } from 'react';

// components
import Corners from '../../../../../Corners/Corners';
import TransformArea from '../../../../../TransformArea/TransformArea';
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// types
import { MouseMode, TElement } from 'types';

// utils
import { getCornersPosition } from '../../utils/getCornersPosition';

type TOutlineProps = {
  absoluteCoordinates?: T2DCoordinates;
  angle: TElement['angle'];
  counterAngle: number;
  elementRef: RefObject<HTMLDivElement>;
  flip: TElement['flip'];
  height: TElement['height']['value'];
  id: TElement['id'];
  mouseMode: MouseMode;
  relativeCoordinates?: TElement['coordinates'];
  width: TElement['width']['value'];
};

const EventsArea: FC<TOutlineProps> = ({
  absoluteCoordinates,
  angle,
  counterAngle,
  elementRef,
  flip,
  height,
  id,
  mouseMode,
  relativeCoordinates,
  width,
}) => {
  const rectCoordinates = getCornersPosition(height, width);
  const { overlayContainerRef } = useRefs();

  return (
    overlayContainerRef.current &&
    createPortal(
      <Box
        style={{
          height,
          left: `${absoluteCoordinates.x}px`,
          top: `${absoluteCoordinates.y}px`,
          transform: `rotate(${angle - counterAngle}deg)`,
          transformOrigin: 'center center',
          width,
        }}
        sx={{ position: 'absolute' }}
      >
        {/* // Technical note: Box blank to allow move block when overflow */}
        <Box style={{ height, width }} />
        <Corners rectCoordinates={rectCoordinates} />
        <TransformArea
          angle={angle}
          counterAngle={counterAngle}
          elementRef={elementRef}
          flip={flip}
          height={height}
          id={id}
          moseMode={mouseMode}
          x={relativeCoordinates.x}
          y={relativeCoordinates.y}
          width={width}
        />
      </Box>,
      overlayContainerRef.current,
    )
  );
};

export default memo(EventsArea);
