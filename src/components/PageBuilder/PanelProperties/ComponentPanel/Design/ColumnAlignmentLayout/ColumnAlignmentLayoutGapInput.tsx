import { FC, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// components
import PopoverGap from './PopoverGap/PopoverGap';
import { ScrubbableInput, UITools } from 'shared';

// others
import { MAX, MIN, PANEL_PROPERTIES_ID } from '../../../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { TGap, TValueExtended } from 'types';

export type TColumnAlignmentLayoutGapInputProps = {
  gap: TValueExtended;
  gapKey: keyof TGap;
  isMixedMode: boolean;
  isMixedValue: boolean;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  showGap: boolean;
  value: string;
};

const ColumnAlignmentLayoutGapInput: FC<TColumnAlignmentLayoutGapInputProps> = ({
  gap,
  gapKey,
  isMixedMode,
  isMixedValue,
  onBlur,
  onChange,
  showGap,
  value,
}) => {
  const icon = useMemo(() => (gapKey === 'column' ? 'GapColumns' : 'GapRows'), []);
  const inputType = isMixedValue ? 'string' : 'number';
  const refInputGap = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  if (!showGap) {
    return null;
  }

  return (
    <UITools.TextField
      e2eValue={gapKey}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      inputRef={refInputGap}
      isMixedMode={isMixedMode}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      onClick={() => refInputGap.current.select()}
      popoverChildren={<PopoverGap gapKey={gapKey} gap={gap} isMixed={isMixedValue} />}
      startAdornment={
        <ScrubbableInput
          e2eValue={gapKey}
          icon={icon}
          iconHeight={8}
          iconWidth={8}
          max={MAX}
          min={MIN}
          onChange={(value) => onChange(value.toString(), true)}
          value={isMixedValue ? 0 : parseFloat(value)}
        />
      }
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.gap.${gapKey}`) }}
      type={inputType}
      value={value}
    />
  );
};

export default ColumnAlignmentLayoutGapInput;
