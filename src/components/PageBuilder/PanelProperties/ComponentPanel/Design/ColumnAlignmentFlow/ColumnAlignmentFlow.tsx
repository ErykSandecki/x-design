import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// hooks
import { useColumnAlignmentFlowEvents } from './hooks/useColumnAlignmentFlowEvents';

// others
import { translationNameSpace } from './constants';

const ColumnAlignmentFlow: FC = () => {
  const { t } = useTranslation();
  const { alignment, isFreeForm, isMixedLayout, onChangeAlignment } = useColumnAlignmentFlowEvents();

  if (isMixedLayout || isFreeForm) {
    return null;
  }

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <UITools.AlignmentArea e2eValue="alignment-flow" onClick={onChangeAlignment} value={alignment} />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignmentFlow;
