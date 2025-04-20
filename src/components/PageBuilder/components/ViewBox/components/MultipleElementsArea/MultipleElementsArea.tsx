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

// utils
import { getCoordinates } from './utils/getCoordinates';

const MultipleElementsArea: FC = () => {
  const isMultipleMoving = useSelector(
    eventSelectorCreator('isMultipleMoving'),
  ) as boolean;
  const [coordinates, setCoordinates] = useState(BASE_RECT);
  const selectedElements = useSelector(selectedElementsSelector);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const sharedRefs = useRefs();

  const rectCoordinates = {
    x1: coordinates.x1,
    x2: coordinates.x2,
    y1: coordinates.y1,
    y2: coordinates.y2,
  };

  useEffect(() => {
    defer(() => {
      const coordinates = getCoordinates(
        isMultipleMoving,
        selectedElements,
        sharedRefs,
      );

      setCoordinates(coordinates);
    });
  }, [isMultipleMoving, selectedElements]);

  if (!isMultiple) {
    return null;
  }

  return (
    <>
      <ClickableArea rectCoordinates={rectCoordinates} />
      {!isMultipleMoving && (
        <Corners rectCoordinates={rectCoordinates} increaseZIndex />
      )}
    </>
  );
};

export default MultipleElementsArea;
