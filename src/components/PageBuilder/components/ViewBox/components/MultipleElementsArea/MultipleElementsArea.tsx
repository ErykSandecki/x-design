import { createPortal } from 'react-dom';
import { defer } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// components
import ClickableArea from '../ClickableArea/ClickableArea';
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
import { TElements } from './types';

// utils
import { getCoordinates } from './utils/getCoordinates';

const MultipleElementsArea: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const { itemsRefs, overlayContainerRef } = useRefs();
  const isMultipleMoving = useSelector(
    eventSelectorCreator('isMultipleMoving'),
  ) as boolean;
  const [elements, setElements] = useState<TElements>({
    elementsCordinates: [],
    outline: BASE_RECT,
  });

  useEffect(() => {
    defer(() => {
      const coordinates = getCoordinates(
        isMultipleMoving,
        selectedElements,
        itemsRefs,
      );

      setElements(coordinates);
    });
  }, [isMultipleMoving, selectedElements]);

  if (!isMultiple) {
    return null;
  }

  return (
    <>
      <ClickableArea
        elementsCordinates={elements.elementsCordinates}
        rectCoordinates={elements.outline}
      />
      {!isMultipleMoving &&
        createPortal(
          <Corners rectCoordinates={elements.outline} />,
          overlayContainerRef.current,
        )}
    </>
  );
};

export default MultipleElementsArea;
