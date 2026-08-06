import cx from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import Corners from '../../Corners/Corners';
import { Small } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { elementAttributeSelectorCreator, eventSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './possible-element.module.scss';

// types
import { ColorsTheme, LayoutType, TElement } from 'types';

// utils
import { getCoordinates } from './utils/getCoordinates';
import { isBaseParent } from 'utils';

export type TPossibleElementProps = {
  parentId: TElement['id'];
};

const PossibleElement: FC<TPossibleElementProps> = ({ parentId }) => {
  const possibleElement = useSelector(eventSelectorCreator('possibleElement'));
  const { t } = useTranslation();
  const { type } = useSelector(elementAttributeSelectorCreator('layout', parentId));
  const { x1, x2, y1, y2 } = getCoordinates(type, possibleElement);
  const isFreeForm = type === LayoutType.freeForm;

  return (
    <div
      className={cx(styles.PossibleElement)}
      style={{
        height: y1,
        left: x1,
        position: isFreeForm ? 'absolute' : 'relative',
        top: y1,
        width: x2,
      }}
    >
      {isBaseParent(parentId) && (
        <Small
          classes={{ className: cx(styles.PossibleElement__label) }}
          color={ColorsTheme.blue1}
          style={{
            width: x2,
          }}
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
    </div>
  );
};

export default PossibleElement;
