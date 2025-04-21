import { createPortal } from 'react-dom';
import { defer } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import ClickableArea from './components/ClickableArea/ClickableArea';
import Corners from '../Corners/Corners';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { BASE_RECT } from 'shared';

// store
import {
  eventSelectorCreator,
  multipleSelectedElementsSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TCoordinatesData } from './types';

// utils
import { getCoordinatesData } from './utils/getCoordinatesData';

const MultipleElementsArea: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const { itemsRefs, overlayContainerRef } = useRefs();
  const isMultipleMoving = useSelector(
    eventSelectorCreator('isMultipleMoving'),
  ) as boolean;
  const [coordinatesData, setCoordinatesData] = useState<TCoordinatesData>({
    elementsCordinates: [],
    outline: BASE_RECT,
  });

  useEffect(() => {
    defer(() => {
      const coordinates = getCoordinatesData(
        isMultipleMoving,
        selectedElements,
        itemsRefs,
      );

      setCoordinatesData(coordinates);
    });
  }, [isMultipleMoving, selectedElements]);

  if (!isMultiple) {
    return null;
  }

  return (
    <>
      <ClickableArea
        elementsCordinates={coordinatesData.elementsCordinates}
        outlineCoordinates={coordinatesData.outline}
      />
      {!isMultipleMoving &&
        createPortal(
          <Corners rectCoordinates={coordinatesData.outline} />,
          overlayContainerRef.current,
        )}
    </>
  );
};

export default MultipleElementsArea;
