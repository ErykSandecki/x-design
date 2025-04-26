import { FC } from 'react';
import { first, noop } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import {
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

const ColumnAlignment: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const disabled = element.parentId === '-1' || element.position === 'relative';
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn labels={[t(`${translationNameSpace}.label`)]}>
      <UITools.ButtonGroup
        buttons={[
          { disabled, name: 'AlignHorizontalLeft', onClick: noop },
          { disabled, name: 'AlignHorizontalCenter', onClick: noop },
          { disabled, name: 'AlignHorizontalRight', onClick: noop },
        ]}
      />
      <UITools.ButtonGroup
        buttons={[
          { disabled, name: 'AlignVerticalTop', onClick: noop },
          { disabled, name: 'AlignVerticalCenter', onClick: noop },
          { disabled, name: 'AlignVerticalBottom', onClick: noop },
        ]}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignment;
