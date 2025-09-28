import { FC } from 'react';
import { head, size } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnHeaderButtonIcons from './ColumnHeaderButtonIcons';
import { Small, UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';

const ColumnHeader: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const amountElements = size(selectedElements);
  const text = amountElements === 1 ? `header.${head(selectedElements).type}` : `header`;
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn buttonsIcon={ColumnHeaderButtonIcons()}>
      <Small>
        {t(`${translationNameSpace}.${text}`, {
          amount: amountElements,
          count: amountElements,
        })}
      </Small>
    </UITools.SectionColumn>
  );
};

export default ColumnHeader;
