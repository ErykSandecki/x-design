import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import Corners from '../../Corners/Corners';
import { Box, Small } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { translationNameSpace } from './constants';

// store
import { elementAttributeSelectorCreator, eventSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './possible-element.scss';

// types
import { LayoutType, TElement } from 'types';

// utils
import { getCoordinates } from './utils/getCoordinates';
import { isBaseParent } from 'utils';

export type TPossibleElementProps = {
  parentId: TElement['id'];
};

const PossibleElement: FC<TPossibleElementProps> = ({ parentId }) => {
  const possibleElement = useSelector(eventSelectorCreator('possibleElement'));
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();
  const { type } = useSelector(elementAttributeSelectorCreator('layout', parentId));
  const { x1, x2, y1, y2 } = getCoordinates(type, possibleElement);
  const isFreeForm = type === LayoutType.freeForm;

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
      style={{
        height: y1,
        left: x1,
        position: isFreeForm ? 'absolute' : 'relative',
        top: y1,
        width: x2,
      }}
      sx={{
        overflow: 'visible',
      }}
    >
      {isBaseParent(parentId) && (
        <Small
          classes={{ className: cx(classNamesWithTheme.label) }}
          style={{
            width: x2,
          }}
          sx={{ cl: 'blue1', position: 'absolute' }}
        >
          {t(`${translationNameSpace}.label.createFrame`)}
        </Small>
      )}
      <Corners
        rectCoordinates={{
          x1: 0,
          x2: x2,
          y1: 0,
          y2: y2,
        }}
      />
    </Box>
  );
};

export default PossibleElement;
