import { FC } from 'react';
import { first } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignmentButtonsGroup from './ColumnAlignmentButtonsGroup';
import { UITools } from 'shared';

// hooks
import { useClickHorizontalAlignmentEvent } from './hooks/useClickHorizontalAlignmentEvent';
import { useClickVerticalAlignmentEvent } from './hooks/useClickVerticalAlignmentEvent';

// others
import { HORIZONTAL_BUTTONS, translationNameSpace, VERTICAL_BUTTONS } from './constants';

// store
import {
  areParentsTheSameSelector,
  elementDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { GridColumnType } from 'shared/UITools/components/Section/components/SectionColumn/enums';

// utils
import { isBaseParent } from 'utils';

const ColumnAlignment: FC = () => {
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const onClickHorizontalAlignment = useClickHorizontalAlignmentEvent();
  const onClickVerticalAlignment = useClickVerticalAlignmentEvent();
  const { t } = useTranslation();
  const baseParent = isBaseParent(element.parentId);
  const isRelative = element.position === 'relative';
  const disabled = baseParent || isRelative || !areParentsTheSame;

  return (
    <UITools.SectionColumn
      gridColumnType={GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <ColumnAlignmentButtonsGroup
        buttonGroups={HORIZONTAL_BUTTONS}
        disabled={disabled}
        e2eValue="horizontal-alignment"
        onClick={onClickHorizontalAlignment}
      />
      <ColumnAlignmentButtonsGroup
        buttonGroups={VERTICAL_BUTTONS}
        disabled={disabled}
        e2eValue="vertical-alignment"
        onClick={onClickVerticalAlignment}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignment;
