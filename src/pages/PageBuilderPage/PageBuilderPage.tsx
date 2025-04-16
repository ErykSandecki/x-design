import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import PanelProperties from 'components/PageBuilder/components/PanelProperties/PanelProperties';
import Toolbar from 'components/PageBuilder/components/Toolbar/Toolbar';
import ViewBox from 'components/PageBuilder/components/ViewBox/ViewBox';

// hooks
import { useKeyDown } from './hooks/useKeyDown';
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

  useKeyDown(setMouseMode);
  useWheelEvent();

  return (
    <Box>
      <Toolbar mouseMode={mouseMode} setMouseMode={setMouseMode} />
      <PanelProperties />
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
