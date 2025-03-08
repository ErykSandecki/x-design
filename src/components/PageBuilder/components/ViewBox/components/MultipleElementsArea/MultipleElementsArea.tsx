import { FC, memo, useRef } from 'react';
import { useSelector } from 'react-redux';

// components
import Corners from '../Corners/Corners';
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// store
import {
  multipleSelectedElementsSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// styles
import styles from './multiple-elements-area.scss';

// types
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { calculateBoxSize } from './utils/calculateBoxSize';
import { getCoordinates } from './utils/getCoordinates';

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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!isMultiple) {
    return null;
  }

  return (
    <Corners
      rectCoordinates={{
        x1: coordinates.x1,
        x2: coordinates.x2,
        y1: coordinates.y1,
        y2: coordinates.y2,
      }}
      withOutline
    />
  );
};

export default memo(MultipleElementsArea);
