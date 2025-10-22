import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// hooks
import { useColumnAlignmentLayoutEvents } from './hooks/useColumnAlignmentLayoutEvents';

// others
import { translationNameSpace } from './constants';

const ColumnAlignmentLayout: FC = () => {
  const { t } = useTranslation();
  const { alignment, isFreeForm, isMixedLayout, onChangeAlignment } = useColumnAlignmentLayoutEvents();

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

export default ColumnAlignmentLayout;
