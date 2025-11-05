import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnAppearanceButtonIcons from './ColumnAppearanceButtonIcons';
import ColumnAppearanceInput from './ColumnAppearanceInput';
import PopoverBorderRadius from './PopoverBorderRadius/PopoverBorderRadius';
import PopoverOpacity from './PopoverOpacity/PopoverOpacity';
import { UITools } from 'shared';

// hooks
import { useAppearanceEvents } from './hooks/useAppearanceEvents';

// others
import { MAX } from '../../../../constants';
import { translationNameSpace } from './constants';

// store
import { applyElementsType } from 'store/pageBuilder/actions';

const ColumnAppearance: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    borderRadius,
    borderRadiusMode,
    isBorderRaiusModeMerged,
    isMixedBorderRadiusMode,
    isMixedBorderRadiusValue,
    isMixedOpacity,
    onBlurBorderRadius,
    onBlurOpacity,
    onChangeBorderRadius,
    onChangeOpacity,
    opacity,
    opacityMode,
    setBorderRadiusMode,
  } = useAppearanceEvents();

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnAppearanceButtonIcons(isBorderRaiusModeMerged, setBorderRadiusMode, t)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <ColumnAppearanceInput
        e2eValue="opacity"
        isMixedMode={false}
        isMixedValue={isMixedOpacity}
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
        isMixedMode={isMixedBorderRadiusMode}
        isMixedValue={isMixedBorderRadiusValue}
        max={MAX}
        min={0}
        mode={borderRadiusMode}
        name="Corners"
        onBlur={onBlurBorderRadius}
        onChange={onChangeBorderRadius}
        onDetachedValue={() =>
          dispatch(applyElementsType('fixed', ['borderRadius.b', 'borderRadius.l', 'borderRadius.r', 'borderRadius.t']))
        }
        popoverChildren={
          <PopoverBorderRadius isMixed={isMixedBorderRadiusMode} mode={borderRadiusMode} value={borderRadius} />
        }
        value={borderRadius}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAppearance;
