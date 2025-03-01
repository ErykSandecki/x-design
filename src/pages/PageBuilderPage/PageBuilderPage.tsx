import { FC, useState } from 'react';

// components
import Toolbar from 'components/PageBuilder/components/Toolbar/Toolbar';
import ViewBox from 'components/PageBuilder/components/ViewBox/ViewBox';

// hooks
import { useWheelEvent } from './hooks/useWheelEvent';

// others
import { BASE_3D, Box } from 'shared';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const PageBuilderPage: FC = () => {
  const [coordinates, setCoordinates] = useState(BASE_3D);
  const [mouseMode, setMouseMode] = useState(MouseMode.default);

  useWheelEvent();

  return (
    <Box>
      <Toolbar mouseMode={mouseMode} setMouseMode={setMouseMode} />
      <ViewBox
        coordinates={coordinates}
        mouseMode={mouseMode}
        setCoordinates={setCoordinates}
      />
    </Box>
  );
};

export default PageBuilderPage;
