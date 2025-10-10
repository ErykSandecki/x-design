import { FC, useRef } from 'react';
import { lowerCase } from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, Small, TE2EValue, UITools } from 'shared';

// others
import { MAX, MIN } from '../../../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { ColorsTheme, KeyboardKeys } from 'types';

// utils
import { getValue } from './utils/getValue';
import { handleSubmitInput } from 'utils';

export type TColumnPositionInputProps = {
  disabled: boolean;
  disabledAll: boolean;
  e2eValue: TE2EValue;
  hasAlignment: boolean;
  isMultiple: boolean;
  label: string;
  onBlur: TFunc;
  onChange: TFunc<[string, boolean?]>;
  onMouseDown: TFunc;
  typeInput: HTMLInputElement['type'];
  value: string;
};

const ColumnPositionInput: FC<TColumnPositionInputProps> = ({
  disabled,
  disabledAll,
  e2eValue,
  hasAlignment,
  isMultiple,
  label,
  onBlur,
  onChange,
  onMouseDown,
  typeInput,
  value,
}) => {
  const dispatch = useDispatch();
  const refInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <UITools.TextField
      disabled={disabled}
      e2eValue={e2eValue}
      fullWidth
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      onClick={() => refInput.current.select()}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInput.current)(event)}
      ref={refInput}
      startAdornment={
        <ScrubbableInput
          disabled={disabled}
          e2eValue={e2eValue}
          max={MAX}
          min={MIN}
          onChange={(value) => onChange(value.toString(), true)}
          onMouseDown={onMouseDown}
          onMouseUp={() => dispatch(updateEventsStatus({ isMultipleMoving: false }))}
          value={isMultiple ? 0 : parseFloat(value)}
        >
          <Small color={ColorsTheme.neutral2}>{label}</Small>
        </ScrubbableInput>
      }
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.coordinates.${lowerCase(label)}`) }}
      type={typeInput}
      value={getValue(disabledAll, hasAlignment, isMultiple, value)}
    />
  );
};

export default ColumnPositionInput;
