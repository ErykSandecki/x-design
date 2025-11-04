import { capitalize } from 'lodash';
import { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// components
import { Icon, ScrubbableInput, TE2EValue, TIconProps, UITools } from 'shared';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../constants';

// store
import { applyElementsType } from 'store/pageBuilder/actions';

// types
import { ColorsTheme, TElement, TScore, TValueExtended } from 'types';

// utils
import { sanitizeNumberInput } from 'utils';

export type TColumnResizingInputProps = {
  e2eValue: TE2EValue;
  mode: TValueExtended['mode'];
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  popoverChildren?: ReactNode;
  scoreKey: keyof TScore;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: string;
  valueScrubbaleInput: number;
};

const ColumnMinMaxSizeInput: FC<TColumnResizingInputProps> = ({
  e2eValue,
  mode,
  onBlur,
  onChange,
  popoverChildren,
  scoreKey,
  sizeType,
  value,
  valueScrubbaleInput,
}) => {
  const dispatch = useDispatch();
  const iconName = `${capitalize(scoreKey)}${capitalize(sizeType)}` as TIconProps['name'];

  return (
    <UITools.TextField
      e2eValue={e2eValue}
      fullWidth
      idContainer={PANEL_PROPERTIES_ID}
      mode={mode}
      onBlur={onBlur}
      onChange={(event) => onChange(sanitizeNumberInput(event.target.value))}
      onDetachedValue={() => dispatch(applyElementsType('fixed', [`${sizeType}.${scoreKey}`]))}
      popoverChildren={popoverChildren}
      startAdornment={
        <ScrubbableInput
          e2eValue={e2eValue}
          max={MAX}
          min={0}
          onChange={(value) => onChange(value.toString(), true)}
          value={valueScrubbaleInput}
        >
          <Icon color={ColorsTheme.neutral2} height={12} name={iconName} width={12} />
        </ScrubbableInput>
      }
      type="text"
      value={value}
    />
  );
};

export default ColumnMinMaxSizeInput;
