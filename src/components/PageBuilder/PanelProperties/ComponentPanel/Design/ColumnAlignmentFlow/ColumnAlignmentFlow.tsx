import { FC } from 'react';
import { noop } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// types
import { AlignmentFlow } from 'types';

const ColumnAlignmentFlow: FC = () => {
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <UITools.AlignmentArea onClick={noop} value={AlignmentFlow.center} />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignmentFlow;
