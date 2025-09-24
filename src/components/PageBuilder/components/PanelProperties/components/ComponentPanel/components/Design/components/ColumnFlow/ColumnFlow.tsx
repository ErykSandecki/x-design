import { FC } from 'react';
import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { toggleButtons, translationNameSpace } from './constants';

// store
import { changeLayout } from 'store/pageBuilder/actions';
import {
  dynamicDataSelector,
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { GridColumnType } from 'shared/UITools/components/Section/components/SectionColumn/enums';
import { LayoutType } from 'types';

// utils
import { isMixed } from '../../utils/isMixed';

const ColumnFlow: FC = () => {
  const dispatch = useDispatch();
  const dynamicData = useSelector(dynamicDataSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const isMixedLayoutType = isMixed(
    dynamicData,
    firstElement,
    'layout.type',
    selectedElements,
  );
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      gridColumnType={GridColumnType.single}
      labels={[t(`${translationNameSpace}.label`)]}
    >
      <UITools.ToggleButtonGroup
        defaultValue={isMixedLayoutType ? '' : element.layout.type}
        e2eValue="flow"
        fullWidth
        onChange={(layoutType) =>
          dispatch(changeLayout(layoutType as LayoutType))
        }
        toggleButtons={toggleButtons}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnFlow;
