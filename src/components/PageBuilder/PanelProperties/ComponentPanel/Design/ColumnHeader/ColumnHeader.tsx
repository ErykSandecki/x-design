import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnHeaderButtonIcons from './ColumnHeaderButtonIcons';
import { Small, UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { selectedElementsSizeSelector } from 'store/pageBuilder/selectors';

const ColumnHeader: FC = () => {
  const selectedElementsSize = useSelector(selectedElementsSizeSelector);
  const text = selectedElementsSize === 1 ? `header.frame` : `header`;
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn buttonsIcon={ColumnHeaderButtonIcons(t)}>
      <Small style={{ alignItems: 'center', display: 'flex' }}>
        {t(`${translationNameSpace}.${text}`, {
          amount: selectedElementsSize,
          count: selectedElementsSize,
        })}
      </Small>
    </UITools.SectionColumn>
  );
};

export default memo(ColumnHeader);
