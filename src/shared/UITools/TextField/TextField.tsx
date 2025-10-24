import { FC, InputHTMLAttributes, ReactNode, RefObject } from 'react';

// components
import Box from '../../UI/Box/Box';
import TextFieldPopover from './TextFieldPopover/TextFieldPopover';
import TextFieldChip, { TTextFieldChipProps } from './TextFieldChip/TextFieldChip';
import Tooltip, { TTooltipProps } from '../../UI/Tooltip/Tooltip';
import { TPopoverProps } from '../Popover/Popover';

// hooks
import { useTheme } from 'hooks';

// others
import { className as textFieldClassName, classNames } from './classNames';

// styles
import styles from './text-field.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// utils
import { getAttributes } from 'shared/E2EDataAttributes/utils';
import { stopPropagation } from 'utils';

export type TTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'popover' | 'style'
> & {
  chipChildren?: TTextFieldChipProps['children'];
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  endAdorment?: ReactNode;
  fullWidth?: boolean;
  idContainer?: string;
  popoverChildren?: TPopoverProps['children'];
  popoverOffset?: TPopoverProps['offset'];
  ref?: RefObject<HTMLInputElement>;
  startAdornment?: ReactNode;
  tooltip?: Omit<TTooltipProps, 'children'>;
};

export const TextField: FC<TTextFieldProps> = ({
  chipChildren,
  className = '',
  disabled,
  e2eValue = '',
  endAdorment,
  fullWidth = false,
  idContainer = undefined,
  popoverChildren,
  popoverOffset,
  ref,
  startAdornment,
  tooltip,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Tooltip {...tooltip}>
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
          onKeyDown={stopPropagation}
          ref={ref}
          {...getAttributes(E2EAttribute.textFieldInput, e2eValue)}
          {...restProps}
        />
        {popoverChildren ? (
          <TextFieldPopover
            classNameIcon={cx(classNamesWithTheme.icon)}
            idContainer={idContainer}
            offset={popoverOffset}
          >
            {popoverChildren}
          </TextFieldPopover>
        ) : (
          endAdorment
        )}
        {chipChildren && <TextFieldChip onClick={() => ref.current.focus()}>{chipChildren}</TextFieldChip>}
      </Box>
    </Tooltip>
  );
};

export default TextField;
