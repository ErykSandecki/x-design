import { FC, InputHTMLAttributes, ReactNode, RefObject, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box from '../../../UI/Box/Box';
import TextFieldChip from './TextFieldChip/TextFieldChip';
import TextFieldPopover from './TextFieldPopover/TextFieldPopover';
import { TPopoverProps } from '../../Popover/Popover';

// hooks
import { useOutsideClick, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field-wrapper.scss';

// types
import { E2EAttribute, KeyboardKeys, TValueExtended } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TextFieldVariant } from '../enums';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';
import { getChipValue } from './utils/getChipValue';
import { handleSubmitInput, valueAttached } from 'utils';

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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { selected, setSelected } = useOutsideClick([], refPopover, noop, idContainer);

  return (
    <Box
      classes={{
        className: cx(
          classNamesWithTheme[className].name,
          [classNamesWithTheme[className].modificators.chip, attached],
          [classNamesWithTheme[className].modificators.disabled, disabled],
          [classNamesWithTheme[className].modificators.fullWidth, fullWidth],
          classNamesWithTheme[className].modificators[variant],
        ),
      }}
      e2eAttribute={E2EAttribute.textFieldWrapper}
      e2eValue={e2eValue}
      onClick={() => attached && setSelected(true)}
      ref={wrapperRef}
      style={style}
    >
      {startAdornment}
      <input
        className={cx(classNamesWithTheme.input)}
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
          classNameIcon={cx(classNamesWithTheme.icon)}
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
        className={cx(classNamesWithTheme.chip.name, [classNamesWithTheme.chip.modificators.attachedValue, attached])}
      >
        {chipValue}
      </TextFieldChip>
    </Box>
  );
};

export default TextFieldWrapper;
