import { FC, ReactNode, useRef } from 'react';

// components
import { Icon, ScrubbableInput, Small, TE2EValue, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../constants';

// types
import { ColorsTheme, KeyboardKeys, TElement } from 'types';

// utils
import { handleSubmitInput, sanitizeNumberInput } from 'utils';

export type TColumnResizingInputProps = {
  e2eValue: TE2EValue;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  popoverChildren: ReactNode;
  showChip: boolean;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: string;
  valueScrubbaleInput: number;
};

const ColumnResizingInput: FC<TColumnResizingInputProps> = ({
  e2eValue,
  onBlur,
  onChange,
  showChip,
  popoverChildren,
  sizeType,
  value,
  valueScrubbaleInput,
}) => {
  const disabled = showChip;
  const chipChildren = showChip && <>{value}</>;
  const refInput = useRef<HTMLInputElement>(null);
  const label = sizeType === 'height' ? 'H' : 'W';
  const iconName = sizeType === 'height' ? 'HeightRestricted' : 'WidthRestricted';

  return (
    <UITools.TextField
      chipChildren={chipChildren}
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      inputRef={refInput}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInput.current)(event)}
      popoverChildren={popoverChildren}
      startAdornment={
        <ScrubbableInput
          disabled={disabled}
          e2eValue={e2eValue}
          max={MAX}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={valueScrubbaleInput}
        >
          {!disabled ? (
            <Small color={ColorsTheme.neutral2}>{label}</Small>
          ) : (
            <Icon color={ColorsTheme.neutral2} height={12} name={iconName} width={12} />
          )}
        </ScrubbableInput>
      }
      type="text"
      value={value}
    />
  );
};

export default ColumnResizingInput;
