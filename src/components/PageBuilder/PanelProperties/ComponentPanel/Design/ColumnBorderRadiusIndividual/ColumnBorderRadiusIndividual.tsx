import { FC } from 'react';

// components
import Insets from '../../../../shared/Insets/Insets';

// others
import { translationNameSpace } from './constants';

// types
import { InsetMode } from 'components/PageBuilder/shared/Insets/enums';

export type TColumnBorderRadiusIndividualProps = {
  isBorderRaiusModeMerged: boolean;
};

const ColumnBorderRadiusIndividual: FC<TColumnBorderRadiusIndividualProps> = ({ isBorderRaiusModeMerged }) => {
  if (isBorderRaiusModeMerged) {
    return null;
  }

  return (
    <Insets
      iconSize={8}
      initialInsetMode={InsetMode.individual}
      insetsName="borderRadius"
      showButtons={false}
      showLabels={false}
      translationNameSpace={translationNameSpace}
    />
  );
};

export default ColumnBorderRadiusIndividual;
