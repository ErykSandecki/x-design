import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import InsetsButtonIcons from './InsetsButtonIcons';
import InsetsInputsModeIndividual from './InsetsInputsModeIndividual';
import InsetsInputsModeMerged from './InsetsInputsModeMerged';
import { UITools } from 'shared';

// hooks
import { useInsetsEvents } from './hooks/useInsetsEvents';

// types
import { TInsetsName } from 'types';

export type TInsetsProps = {
  insetsName: TInsetsName;
  translationNameSpace: string;
};

export const Insets: FC<TInsetsProps> = ({ insetsName, translationNameSpace }) => {
  const { t } = useTranslation();

  const {
    insetAll,
    insetLR,
    insetTB,
    isMixedInsetMode,
    isMixedInsetValue,
    isMixedLRMode,
    isMixedLRValue,
    isMixedTBMode,
    isMixedTBValue,
    isInsetModeMerged,
    onBlurInset,
    onBlurInsetLR,
    onBlurInsetTB,
    onChangeInset,
    onChangeInsetLR,
    onChangeInsetTB,
    setInsetMode,
  } = useInsetsEvents(insetsName);

  return (
    <UITools.SectionColumn
      buttonsIcon={InsetsButtonIcons(insetsName, isInsetModeMerged, setInsetMode, t)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <InsetsInputsModeMerged
        insetLR={insetLR}
        insetsName={insetsName}
        insetTB={insetTB}
        isInsetModeMerged={isInsetModeMerged}
        isMixedLRMode={isMixedLRMode}
        isMixedLRValue={isMixedLRValue}
        isMixedTBMode={isMixedTBMode}
        isMixedTBValue={isMixedTBValue}
        onBlurInsetLR={onBlurInsetLR}
        onBlurInsetTB={onBlurInsetTB}
        onChangeInsetLR={onChangeInsetLR}
        onChangeInsetTB={onChangeInsetTB}
        translationNameSpace={translationNameSpace}
      />
      <InsetsInputsModeIndividual
        insets={insetAll}
        insetsName={insetsName}
        isInsetModeMerged={isInsetModeMerged}
        isMixedInsetMode={isMixedInsetMode}
        isMixedInsetValue={isMixedInsetValue}
        onBlurInset={onBlurInset}
        onChangeInset={onChangeInset}
        translationNameSpace={translationNameSpace}
      />
    </UITools.SectionColumn>
  );
};

export default Insets;
