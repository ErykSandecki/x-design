import { FC, ReactNode, useRef } from 'react';

// components
import { Icon, ScrubbableInput, Small, TE2EValue, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../constants';

// types
import { ColorsTheme, TElement } from 'types';

// utils
import { sanitizeNumberInput } from 'utils';

export type TColumnResizingInputProps = {
  attachedValue: boolean;
  e2eValue: TE2EValue;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  popoverChildren: ReactNode;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: string;
  valueScrubbaleInput: number;
};

const ColumnResizingInput: FC<TColumnResizingInputProps> = ({
  attachedValue,
  e2eValue,
  onBlur,
  onChange,
  popoverChildren,
  sizeType,
  value,
  valueScrubbaleInput,
}) => {
  const refInput = useRef<HTMLInputElement>(null);
  const label = sizeType === 'height' ? 'H' : 'W';
  const iconName = sizeType === 'height' ? 'HeightRestricted' : 'WidthRestricted';

  return (
    <UITools.TextField
      attachedValue={attachedValue}
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      inputRef={refInput}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      popoverChildren={popoverChildren}
      startAdornment={
        <ScrubbableInput
          disabled={attachedValue}
          e2eValue={e2eValue}
          max={MAX}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={valueScrubbaleInput}
        >
          {!attachedValue ? (
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
