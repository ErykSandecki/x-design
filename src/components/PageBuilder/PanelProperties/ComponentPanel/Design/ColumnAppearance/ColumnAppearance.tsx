import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnAppearanceInput from './ColumnAppearanceInput';
import PopoverBorderRadius from './PopoverBorderRadius/PopoverBorderRadius';
import PopoverOpacity from './PopoverOpacity/PopoverOpacity';
import { UITools } from 'shared';

// hooks
import { useAppearanceEvents } from './hooks/useAppearanceEvents';

// others
import { MAX } from '../../../../constants';
import { translationNameSpace } from './constants';

const ColumnAppearance: FC = () => {
  const { t } = useTranslation();
  const {
    borderRadius,
    borderRadiusMode,
    isMixedBorderRadius,
    isMixedOpacity,
    onBlurBorderRadius,
    onBlurOpacity,
    onChangeBorderRadius,
    onChangeOpacity,
    opacity,
    opacityMode,
  } = useAppearanceEvents();

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <ColumnAppearanceInput
        e2eValue="opacity"
        isMixed={isMixedOpacity}
        max={100}
        min={0}
        mode={opacityMode}
        name="Opacity"
        onBlur={onBlurOpacity}
        onChange={onChangeOpacity}
        popoverChildren={<PopoverOpacity isMixed={isMixedOpacity} mode={opacityMode} value={opacity} />}
        value={opacity}
      />
      <ColumnAppearanceInput
        e2eValue="border-radius"
        isMixed={isMixedBorderRadius}
        max={MAX}
        min={0}
        mode={borderRadiusMode}
        name="Corners"
        onBlur={onBlurBorderRadius}
        onChange={onChangeBorderRadius}
        popoverChildren={
          <PopoverBorderRadius isMixed={isMixedBorderRadius} mode={borderRadiusMode} value={borderRadius} />
        }
        value={borderRadius}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAppearance;
