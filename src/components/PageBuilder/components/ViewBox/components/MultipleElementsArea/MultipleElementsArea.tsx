import { createPortal } from 'react-dom';
import { FC } from 'react';
import { useSelector } from 'react-redux';

// components
import ClickableArea from './components/ClickableArea/ClickableArea';
import Corners from '../Corners/Corners';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { multipleSelectedElementsSelector } from 'store/pageBuilder/selectors';

// utils
import { useMultipleELementsAreaEvents } from './hooks/useMultipleELementsAreaEvents';

const MultipleElementsArea: FC = () => {
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const { overlayContainerRef } = useRefs();
  const { coordinatesData, showCorners } = useMultipleELementsAreaEvents();

  if (!isMultiple) {
    return null;
  }

  return (
    <>
      <ClickableArea
        elementsCordinates={coordinatesData.elementsCoordinates}
        outlineCoordinates={coordinatesData.outline}
      />
      {showCorners && createPortal(<Corners rectCoordinates={coordinatesData.outline} />, overlayContainerRef.current)}
    </>
  );
};

export default MultipleElementsArea;
