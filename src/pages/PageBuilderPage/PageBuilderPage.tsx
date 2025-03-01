import { FC, useState } from 'react';

// components
import Toolbar from 'components/PageBuilder/components/Toolbar/Toolbar';
import { Box, INITIAL_COORDINATES, ZoomBox } from 'shared';

// hooks
import { useWheelEvent } from './hooks/useWheelEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const PageBuilderPage: FC = () => {
  const [coordinates, setCoordinates] = useState(INITIAL_COORDINATES);
  const [mouseMode, setMouseMode] = useState(MouseMode.default);

  useWheelEvent();

  return (
    <Box>
      <Toolbar mouseMode={mouseMode} setMouseMode={setMouseMode} />
      <ZoomBox coordinates={coordinates} setCoordinates={setCoordinates}>
        zoombox
      </ZoomBox>
    </Box>
  );
};

export default PageBuilderPage;
