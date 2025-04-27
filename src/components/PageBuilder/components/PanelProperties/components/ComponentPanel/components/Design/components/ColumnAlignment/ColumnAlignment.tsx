import { FC } from 'react';
import { first } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// hooks
import { useClickHorizontalAlignmentEvent } from './hooks/useClickHorizontalAlignmentEvent';
import { useClickVerticalAlignmentEvent } from './hooks/useClickVerticalAlignmentEvent';

// others
import {
  HORIZONTAL_BUTTONS,
  translationNameSpace,
  VERTICAL_BUTTONS,
} from './constants';

// store
import {
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { TButtonGroup } from 'shared/UITools/components/ButtonGroup/types';

const ColumnAlignment: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const disabled = element.parentId === '-1' || element.position === 'relative';
  const onClickHorizontalAlignment = useClickHorizontalAlignmentEvent();
  const onClickVerticalAlignment = useClickVerticalAlignmentEvent();
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <UITools.ButtonGroup
        buttons={HORIZONTAL_BUTTONS.map(
          ({ key, name }) =>
            ({
              disabled,
              name,
              onClick: () => onClickHorizontalAlignment(key),
            }) as TButtonGroup,
        )}
        e2eValue="horizontal-alignment"
      />
      <UITools.ButtonGroup
        buttons={VERTICAL_BUTTONS.map(
          ({ key, name }) =>
            ({
              disabled,
              name,
              onClick: () => onClickVerticalAlignment(key),
            }) as TButtonGroup,
        )}
        e2eValue="vertical-alignment"
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignment;
