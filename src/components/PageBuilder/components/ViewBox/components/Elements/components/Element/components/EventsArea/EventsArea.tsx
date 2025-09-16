import { createPortal } from 'react-dom';
import { FC, memo, RefObject } from 'react';

// components
import Corners from '../../../../../Corners/Corners';
import TransformArea from '../../../../../TransformArea/TransformArea';
import { Box } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// types
import { MouseMode, T2DCoordinates, TElement } from 'types';

// utils
import { getCornersPosition } from '../../utils/getCornersPosition';

type TOutlineProps = {
  absoluteCoordinates?: T2DCoordinates;
  elementRef: RefObject<HTMLDivElement>;
  height: TElement['height'];
  id: TElement['id'];
  mouseMode: MouseMode;
  relativeCoordinates?: TElement['coordinates'];
  rotate: TElement['rotate'];
  width: TElement['width'];
};

const EventsArea: FC<TOutlineProps> = ({
  absoluteCoordinates,
  elementRef,
  height,
  id,
  mouseMode,
  relativeCoordinates,
  rotate,
  width,
}) => {
  const rectCoordinates = getCornersPosition(height, width);
  const { overlayContainerRef } = useRefs();

  return createPortal(
    <Box
      style={{
        height,
        left: `${absoluteCoordinates.x}px`,
        top: `${absoluteCoordinates.y}px`,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center center',
        width,
      }}
      sx={{ position: 'absolute' }}
    >
      {/* // Technical note: Box blank to allow move block when overflow */}
      <Box style={{ height, width }} />
      <Corners rectCoordinates={rectCoordinates} />
      <TransformArea
        elementRef={elementRef}
        height={height}
        id={id}
        moseMode={mouseMode}
        rotate={rotate}
        x={relativeCoordinates.x}
        y={relativeCoordinates.y}
        width={width}
      />
    </Box>,
    overlayContainerRef.current,
  );
};

export default memo(EventsArea);
