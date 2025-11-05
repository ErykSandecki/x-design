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
import { InsetMode } from './enums';
import { TInsetsName } from 'types';

export type TInsetsProps = {
  iconSize?: number;
  initialInsetMode?: InsetMode;
  insetsName: TInsetsName;
  showButtons?: boolean;
  showLabels?: boolean;
  translationNameSpace: string;
};

export const Insets: FC<TInsetsProps> = ({
  iconSize = 12,
  initialInsetMode = InsetMode.merged,
  insetsName,
  showButtons = true,
  showLabels = true,
  translationNameSpace,
}) => {
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
  } = useInsetsEvents(initialInsetMode, insetsName);

  return (
    <UITools.SectionColumn
      buttonsIcon={InsetsButtonIcons(insetsName, isInsetModeMerged, setInsetMode, showButtons, t)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={showLabels && [t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <InsetsInputsModeMerged
        iconSize={iconSize}
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
        iconSize={iconSize}
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
