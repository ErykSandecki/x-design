import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignmentButtonsGroup from './ColumnAlignmentButtonsGroup';
import { UITools } from 'shared';

// hooks
import { useClickHorizontalAlignmentEvent } from './hooks/useClickHorizontalAlignmentEvent';
import { useClickVerticalAlignmentEvent } from './hooks/useClickVerticalAlignmentEvent';

// others
import { HORIZONTAL_BUTTONS, translationNameSpace, VERTICAL_BUTTONS } from './constants';

// types

// utils
import { disabledAlignment } from '../../../../utils/disabledAlignment';

const ColumnAlignment: FC = () => {
  const disabled = disabledAlignment();
  const onClickHorizontalAlignment = useClickHorizontalAlignmentEvent();
  const onClickVerticalAlignment = useClickVerticalAlignmentEvent();
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.twoInputs}
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
