import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnAppearanceInput from './ColumnAppearanceInput';
import PopoverOpacity from './PopoverOpacity/PopoverOpacity';
import { UITools } from 'shared';

// hooks
import { useAppearanceEvents } from './hooks/useAppearanceEvents';

// others
import { translationNameSpace } from './constants';

const ColumnAppearance: FC = () => {
  const { t } = useTranslation();
  const { attachedOpacity, isMixedOpacity, onBlurOpacity, onChangeOpacity, opacity, opacityType } =
    useAppearanceEvents();

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <ColumnAppearanceInput
        attachedValue={attachedOpacity}
        e2eValue="opacity"
        isMixed={isMixedOpacity}
        name="Opacity"
        onBlur={onBlurOpacity}
        onChange={onChangeOpacity}
        popoverChildren={<PopoverOpacity isMixed={isMixedOpacity} type={opacityType} value={opacity} />}
        value={opacity}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAppearance;
