import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { toggleButtons, translationNameSpace } from './constants';

// store
import { changeLayout } from 'store/pageBuilder/actions';
import {
  isMixedSelectorCreator,
  firstSelectedElementIdSelector,
  elementAttributeNestedSelectorCreator,
} from 'store/pageBuilder/selectors';

// types
import { LayoutType, TLayout } from 'types';

const ColumnFlow: FC = () => {
  const dispatch = useDispatch();
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedLayoutType = useSelector(isMixedSelectorCreator('layout.type'));
  const layoutType = useSelector(elementAttributeNestedSelectorCreator<TLayout['type']>('layout.type', firstElementId));
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.single}
      labels={[t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <UITools.ToggleButtonGroup
        alwaysSelected
        defaultValue={isMixedLayoutType ? '' : layoutType}
        disabledWhenSelected
        e2eValue="flow"
        fullWidth
        onChange={(layoutType) => dispatch(changeLayout(layoutType as LayoutType))}
        toggleButtons={toggleButtons(t)}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnFlow;
