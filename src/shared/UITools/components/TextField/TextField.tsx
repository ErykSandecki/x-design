import { FC, InputHTMLAttributes, ReactNode, Ref } from 'react';

// components
import Box from '../../../UI/components/Box/Box';
import TextFieldPopover from './components/TextFieldPopover/TextFieldPopover';
import { TPopoverProps } from '../Popover/Popover';

// hooks
import { useTheme } from 'hooks';

// others
import { className as textFieldClassName, classNames } from './classNames';

// styles
import styles from './text-field.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

// utils
import { getAttributes } from 'shared/E2EDataAttributes/utils';

export type TTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'popover' | 'style'
> & {
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  endAdorment?: ReactNode;
  fullWidth?: boolean;
  idContainer?: string;
  popoverChildren?: TPopoverProps['children'];
  ref?: Ref<HTMLInputElement>;
  startAdornment?: ReactNode;
};

export const TextField: FC<TTextFieldProps> = ({
  className = '',
  disabled,
  e2eValue = '',
  endAdorment,
  fullWidth = false,
  idContainer = undefined,
  popoverChildren,
  ref,
  startAdornment,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(
          className,
          classNamesWithTheme[textFieldClassName].name,
          [classNamesWithTheme[textFieldClassName].modificators.disabled, disabled],
          [classNamesWithTheme[textFieldClassName].modificators.fullWidth, fullWidth],
        ),
      }}
      e2eAttribute={E2EAttribute.textField}
      e2eValue={e2eValue}
    >
      {startAdornment}
      <input
        className={cx(classNamesWithTheme.input)}
        disabled={disabled}
        maxLength={6}
        ref={ref}
        {...getAttributes(E2EAttribute.textFieldInput, e2eValue)}
        {...restProps}
      />
      {popoverChildren ? (
        <TextFieldPopover classNameIcon={cx(classNamesWithTheme.icon)} idContainer={idContainer}>
          {popoverChildren}
        </TextFieldPopover>
      ) : (
        endAdorment
      )}
    </Box>
  );
};

export default TextField;
