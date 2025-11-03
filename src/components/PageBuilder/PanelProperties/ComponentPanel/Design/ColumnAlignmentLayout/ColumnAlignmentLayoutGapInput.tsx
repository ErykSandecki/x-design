import { FC, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// components
import PopoverGap from './PopoverGap/PopoverGap';
import { ScrubbableInput, UITools } from 'shared';

// others
import { MAX, MIN, PANEL_PROPERTIES_ID } from '../../../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { TGap, TValue } from 'types';

export type TColumnAlignmentLayoutGapInputProps = {
  gap: keyof TGap;
  gapValue: TValue;
  isMixed: boolean;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  showGap: boolean;
  value: string;
};

const ColumnAlignmentLayoutGapInput: FC<TColumnAlignmentLayoutGapInputProps> = ({
  gap,
  gapValue,
  isMixed,
  onBlur,
  onChange,
  showGap,
  value,
}) => {
  const refInputGap = useRef<HTMLInputElement>(null);
  const icon = useMemo(() => (gap === 'column' ? 'GapColumns' : 'GapRows'), []);
  const inputType = isMixed ? 'string' : 'number';
  const { t } = useTranslation();

  if (!showGap) {
    return null;
  }

  return (
    <UITools.TextField
      e2eValue={gap}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      inputRef={refInputGap}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      onClick={() => refInputGap.current.select()}
      popoverChildren={<PopoverGap gapKey={gap} gapValue={gapValue} isMixed={isMixed} />}
      startAdornment={
        <ScrubbableInput
          e2eValue={gap}
          icon={icon}
          iconHeight={8}
          iconWidth={8}
          max={MAX}
          min={MIN}
          onChange={(value) => onChange(value.toString(), true)}
          value={isMixed ? 0 : parseFloat(value)}
        />
      }
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.gap.${gap}`) }}
      type={inputType}
      value={value}
    />
  );
};

export default ColumnAlignmentLayoutGapInput;
