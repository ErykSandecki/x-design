import cx from 'classnames';
import { FC, InputHTMLAttributes, ReactNode, RefObject, useRef } from 'react';
import { noop } from 'lodash';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import TextFieldChip from './TextFieldChip/TextFieldChip';
import TextFieldPopover from './TextFieldPopover/TextFieldPopover';
import { TPopoverProps } from '../../Popover/Popover';

// hooks
import { useOutsideClick } from 'hooks';

// styles
import styles from './text-field-wrapper.scss';

// types
import { E2EAttribute, KeyboardKeys, TValueExtended } from 'types';
import { TextFieldVariant } from '../enums';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';
import { getChipValue } from './utils/getChipValue';
import { handleSubmitInput, valueAttached } from 'utils';

const textFieldWrapperModificators: Record<string, string> = {
  chip: 'TextFieldWrapper--chip',
  disabled: 'TextFieldWrapper--disabled',
  filled: 'TextFieldWrapper--filled',
  fullWidth: 'TextFieldWrapper--full-width',
  outlined: 'TextFieldWrapper--outlined',
};

export type TTextFieldWrapperProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'color' | 'popover'> & {
  disabledSelection?: boolean;
  e2eValue: TE2EDataAttributeProps['value'];
  endAdorment?: ReactNode;
  fullWidth?: boolean;
  idContainer?: string;
  inputRef?: RefObject<HTMLInputElement>;
  isMixedMode?: boolean;
  mode?: TValueExtended['mode'];
  onDetachedValue?: TFunc;
  popoverChildren?: TPopoverProps['children'];
  popoverOffset?: TPopoverProps['offset'];
  popoverStyle?: TPopoverProps['style'];
  startAdornment?: ReactNode;
  variant?: TextFieldVariant;
  wrapperRef?: RefObject<HTMLInputElement>;
};

export const TextFieldWrapper: FC<TTextFieldWrapperProps> = ({
  disabledSelection = false,
  disabled,
  e2eValue,
  endAdorment,
  fullWidth = false,
  idContainer = undefined,
  inputRef,
  isMixedMode = false,
  mode = 'fixed',
  onDetachedValue = noop,
  popoverChildren,
  popoverOffset,
  popoverStyle,
  startAdornment,
  style,
  value,
  variant = TextFieldVariant.filled,
  wrapperRef,
  ...restProps
}) => {
  const attached = valueAttached(isMixedMode, mode);
  const chipValue = getChipValue(isMixedMode, mode, value);
  const refPopover = useRef(null);
  const { selected, setSelected } = useOutsideClick([], refPopover, noop, idContainer);

  return (
    <E2EDataAttribute type={E2EAttribute.textFieldWrapper} value={e2eValue}>
      <div
        className={cx(styles.TextFieldWrapper, styles[textFieldWrapperModificators[variant]], {
          [styles['TextFieldWrapper--chip']]: attached,
          [styles['TextFieldWrapper--disabled']]: disabled,
          [styles['TextFieldWrapper--full-width']]: fullWidth,
        })}
        onClick={() => attached && setSelected(true)}
        ref={wrapperRef}
        style={style}
      >
        {startAdornment}
        <input
          className={cx(styles.TextFieldWrapper__input)}
          disabled={disabled}
          maxLength={6}
          onClick={() => !attached && !disabledSelection && inputRef.current.select()}
          onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, inputRef.current)(event)}
          ref={inputRef}
          value={value}
          {...getAttributes(E2EAttribute.textFieldInput, e2eValue)}
          {...restProps}
        />
        {popoverChildren ? (
          <TextFieldPopover
            attachedValue={attached}
            classNameIcon={cx(styles.TextFieldWrapper__icon)}
            offset={popoverOffset}
            onClick={onDetachedValue}
            ref={refPopover}
            selected={selected}
            setSelected={setSelected}
            style={popoverStyle}
          >
            {popoverChildren}
          </TextFieldPopover>
        ) : (
          endAdorment
        )}
        <TextFieldChip
          attachedValue={attached}
          className={cx(styles.TextFieldWrapper__chip, {
            [styles['TextFieldWrapper__chip--attached-value']]: attached,
          })}
        >
          {chipValue}
        </TextFieldChip>
      </div>
    </E2EDataAttribute>
  );
};

export default TextFieldWrapper;
