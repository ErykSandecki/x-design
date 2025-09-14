import { createPortal } from 'react-dom';
import { FC, memo } from 'react';

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
  height: TElement['height'];
  id: TElement['id'];
  mouseMode: MouseMode;
  relativeCoordinates?: TElement['coordinates'];
  width: TElement['width'];
};

const EventsArea: FC<TOutlineProps> = ({
  absoluteCoordinates,
  height,
  id,
  mouseMode,
  relativeCoordinates,
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
        width,
      }}
      sx={{ position: 'absolute' }}
    >
      {/* BOX BLANK TO ALLOW TO MOVE BLOCK WHEN NOT VISIBLE */}
      <Box style={{ height, width }} />
      <Corners rectCoordinates={rectCoordinates} />
      <TransformArea
        height={height}
        id={id}
        moseMode={mouseMode}
        x={relativeCoordinates.x}
        y={relativeCoordinates.y}
        width={width}
      />
    </Box>,
    overlayContainerRef.current,
  );
};

export default memo(EventsArea);
