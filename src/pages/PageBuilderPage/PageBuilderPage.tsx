import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import Toolbar from 'components/PageBuilder/components/Toolbar/Toolbar';
import ViewBox from 'components/PageBuilder/components/ViewBox/ViewBox';

// hooks
import { useWheelEvent } from './hooks/useWheelEvent';

// others
import { Box } from 'shared';

// store
import { areaCoordinatesSelector } from 'store/pageBuilder/selectors';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const PageBuilderPage: FC = () => {
  const areaCoordinates = useSelector(areaCoordinatesSelector);
  const [coordinates, setCoordinates] = useState(areaCoordinates);
  const [mouseMode, setMouseMode] = useState(MouseMode.default);

  useWheelEvent();

  return (
    <Box>
      <Toolbar mouseMode={mouseMode} setMouseMode={setMouseMode} />
      <ViewBox
        coordinates={coordinates}
        mouseMode={mouseMode}
        setCoordinates={setCoordinates}
        setMouseMode={setMouseMode}
      />
    </Box>
  );
};

export default PageBuilderPage;
