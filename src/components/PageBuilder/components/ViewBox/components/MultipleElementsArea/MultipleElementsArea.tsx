import { FC, memo, useRef } from 'react';
import { useSelector } from 'react-redux';

// components
import Corners from '../Corners/Corners';

// store
import {
  multipleSelectedElementsSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { calculateBoxSize } from './utils/calculateBoxSize';
import { getCoordinates } from './utils/getCoordinates';
import ClickableArea from '../ClickableArea/ClickableArea';

type TMultipleElementsAreaProps = {
  mouseMode: MouseMode;
};

const MultipleElementsArea: FC<TMultipleElementsAreaProps> = ({
  mouseMode,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const selectedElements = useSelector(selectedElementsSelector);
  const coordinates = getCoordinates(selectedElements);
  const { height, width, x, y } = calculateBoxSize(coordinates);
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
      <Corners rectCoordinates={rectCoordinates} />
    </>
  );
};

export default memo(MultipleElementsArea);
