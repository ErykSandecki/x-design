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
import { elementsSelector, elementDataSelectorCreator, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { LayoutType } from 'types';

// utils
import { isMixed } from '../utils/isMixed';

const ColumnFlow: FC = () => {
  const dispatch = useDispatch();
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMixedLayoutType = isMixed(elements, firstElement, 'layout.type', selectedElements);
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.single}
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <UITools.ToggleButtonGroup
        defaultValue={isMixedLayoutType ? '' : element.layout.type}
        e2eValue="flow"
        fullWidth
        onChange={(layoutType) => dispatch(changeLayout(layoutType as LayoutType))}
        toggleButtons={toggleButtons(t)}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnFlow;
