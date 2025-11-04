import { FC, ReactNode, useRef } from 'react';
import { useDispatch } from 'react-redux';

// components
import { Icon, ScrubbableInput, Small, TE2EValue, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../constants';

// store
import { applyElementsType } from 'store/pageBuilder/actions';

// types
import { ColorsTheme, TElement, TValueExtended } from 'types';

// utils
import { sanitizeNumberInput, valueAttached } from 'utils';

export type TColumnResizingInputProps = {
  e2eValue: TE2EValue;
  mode: TValueExtended['mode'];
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  popoverChildren: ReactNode;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: string;
  valueScrubbaleInput: number;
};

const ColumnResizingInput: FC<TColumnResizingInputProps> = ({
  e2eValue,
  mode,
  onBlur,
  onChange,
  popoverChildren,
  sizeType,
  value,
  valueScrubbaleInput,
}) => {
  const attached = valueAttached(mode);
  const dispatch = useDispatch();
  const refInput = useRef<HTMLInputElement>(null);
  const label = sizeType === 'height' ? 'H' : 'W';
  const iconName = sizeType === 'height' ? 'HeightRestricted' : 'WidthRestricted';

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      inputRef={refInput}
      mode={mode}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      onDetachedValue={() => dispatch(applyElementsType('fixed', [sizeType]))}
      popoverChildren={popoverChildren}
      startAdornment={
        <ScrubbableInput
          disabled={attached}
          e2eValue={e2eValue}
          max={MAX}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={valueScrubbaleInput}
        >
          {!attached ? (
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
