import { createPortal } from 'react-dom';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Corners from '../Corners/Corners';
import { Box, Small } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

import { translationNameSpace } from './constants';

// styles
import styles from './element-area.scss';

// types
import { TRectCoordinates } from 'types';

export type TElementAreaProps = {
  elementArea: TRectCoordinates;
};

const ElementArea: FC<TElementAreaProps> = ({ elementArea }) => {
  const { overlayContainerRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();
  const { x1, x2, y1, y2 } = elementArea || {};
  const labelX = x1 < x2 ? x1 : x2;
  const labelY = y1 < y2 ? y1 : y2;

  if (!elementArea) {
    return null;
  }

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
    >
      <Small
        classes={{ className: cx(classNamesWithTheme.label) }}
        sx={{ cl: 'blue1', left: `${labelX}px`, top: `${labelY}px` }}
      >
        {t(`${translationNameSpace}.label.createFrame`)}
      </Small>
      <svg className={cx(classNamesWithTheme.area)}>
        <path d={`M ${x1},${y1} H ${x2} V ${y2} H ${x1} V ${y1}`} />
      </svg>
      {createPortal(
        <Corners
          rectCoordinates={{
            x1: x1 < x2 ? x1 : x2,
            x2: x1 < x2 ? x2 : x1,
            y1: y1 < y2 ? y1 : y2,
            y2: y1 < y2 ? y2 : y1,
          }}
        />,
        overlayContainerRef.current,
      )}
    </Box>
  );
};

export default ElementArea;
