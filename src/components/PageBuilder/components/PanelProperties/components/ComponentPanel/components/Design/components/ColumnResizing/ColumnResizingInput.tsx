import { FC, ReactNode, useRef } from 'react';

// components
import { Icon, ScrubbableInput, Small, TE2EValue, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../../../../../constants';

// types
import { ColorsTheme, KeyboardKeys, TElement, Unit } from 'types';
import { TFocusElement } from './types';

// utils
import { handleSubmitInput, sanitizeNumberInput } from 'utils';

export type TColumnResizingInputProps = {
  e2eValue: TE2EValue;
  inputType: HTMLInputElement['type'];
  isPure: boolean;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  onFocus: TFunc<[TFocusElement]>;
  popoverChildren: ReactNode;
  showChip: boolean;
  size: string;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  unitSize: Unit;
  valueInput: string;
  valueScrubbaleInput: number;
};

const ColumnResizingInput: FC<TColumnResizingInputProps> = ({
  e2eValue,
  inputType,
  isPure,
  onBlur,
  onChange,
  onFocus,
  showChip,
  popoverChildren,
  size,
  sizeType,
  unitSize,
  valueInput,
  valueScrubbaleInput,
}) => {
  // prettier-ignore
  const chipChildren = showChip && <>{size}{unitSize ?? ''}</>
  const refInput = useRef<HTMLInputElement>(null);
  const label = sizeType === 'height' ? 'H' : 'W';
  const iconName = sizeType === 'height' ? 'HeightRestricted' : 'WidthRestricted';

  return (
    <UITools.TextField
      chipChildren={chipChildren}
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      onClick={() => refInput.current.select()}
      onFocus={() => onFocus(sizeType)}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInput.current)(event)}
      popoverChildren={popoverChildren}
      ref={refInput}
      startAdornment={
        <ScrubbableInput
          disabled={!isPure}
          e2eValue={e2eValue}
          max={MAX}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={valueScrubbaleInput}
        >
          {isPure ? (
            <Small color={ColorsTheme.neutral2}>{label}</Small>
          ) : (
            <Icon color={ColorsTheme.neutral2} height={12} name={iconName} width={12} />
          )}
        </ScrubbableInput>
      }
      type={inputType}
      value={valueInput}
    />
  );
};

export default ColumnResizingInput;
