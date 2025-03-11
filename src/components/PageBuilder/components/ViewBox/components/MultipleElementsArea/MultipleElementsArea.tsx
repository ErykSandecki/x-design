import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import ClickableArea from '../ClickableArea/ClickableArea';
import Corners from '../Corners/Corners';

// store
import {
  eventsSelector,
  multipleSelectedElementsSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// utils
import { getCoordinates } from './utils/getCoordinates';

const MultipleElementsArea: FC = () => {
  const { isMultipleMoving } = useSelector(eventsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const coordinates = getCoordinates(isMultipleMoving, selectedElements);
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const rectCoordinates = {
    x1: coordinates.x1,
    x2: coordinates.x2,
    y1: coordinates.y1,
    y2: coordinates.y2,
  };

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

export default memo(MultipleElementsArea);
