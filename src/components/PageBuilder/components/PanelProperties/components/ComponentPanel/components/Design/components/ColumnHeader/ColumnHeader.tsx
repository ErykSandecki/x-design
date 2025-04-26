import { FC } from 'react';
import { head, size } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { Small, UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';

const ColumnHeader: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const amountElements = size(selectedElements);
  const text =
    amountElements === 1 ? `header.${head(selectedElements).type}` : `header`;
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      buttonsIcon={[
        <UITools.ButtonIcon key={0} name="HtmlTag" />,
        <UITools.ButtonIcon key={1} name="Component" />,
      ]}
    >
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
