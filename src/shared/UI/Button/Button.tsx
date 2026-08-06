import cx from 'classnames';
import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useIcon } from './hooks/useIcon';
import { useRippleEffect } from 'hooks/useRippleEffect/useRippleEffect';
import { useSX } from '../hooks/sx/useSX';

// others

// styles
import styles from './styles/button.scss';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { E2EAttribute } from 'types';
import { InputSize } from '../enums';
import { TIconProps } from '../Icon/Icon';
import { TUIProps } from '../types';

const buttonModificators: Record<string, string> = {
  contained: 'Button--contained',
  error: 'Button--error',
  forcedHover: 'Button--forced-hover',
  fullwidth: 'Button--fullwidth',
  large: 'Button--large',
  medium: 'Button--medium',
  outlined: 'Button--outlined',
  primary: 'Button--primary',
  secondary: 'Button--secondary',
  small: 'Button--small',
  success: 'Button--success',
  text: 'Button--text',
  warning: 'Button--warning',
};

export type TButtonProps = Omit<ButtonHTMLAttributes<HTMLElement>, 'className' | 'color' | 'style'> &
  TUIProps<{ className: string }> & {
    children?: ReactNode;
    color?: ButtonColor;
    disabledRippleEffect?: boolean;
    e2eAttribute?: TE2EDataAttributeProps['type'];
    e2eValue?: TE2EDataAttributeProps['value'];
    endIcon?: TIconProps['name'];
    forcedHover?: boolean;
    fullWidth?: boolean;
    ref?: Ref<HTMLButtonElement>;
    size?: InputSize;
    startIcon?: TIconProps['name'];
    variant?: ButtonVariant;
  };

export const Button: FC<TButtonProps> = ({
  children,
  classes = { className: '' },
  color = ButtonColor.primary,
  depsSx = [],
  disabled = false,
  disabledRippleEffect = false,
  endIcon = null,
  e2eAttribute = E2EAttribute.button,
  e2eValue = '',
  forcedHover = false,
  fullWidth = false,
  onClick,
  ref,
  sx = {},
  size = InputSize.medium,
  startIcon = null,
  type = 'button',
  variant = ButtonVariant.contained,
  ...restProps
}) => {
  const { rippleEffect, triggerRippleEffect } = useRippleEffect('Button', styles);
  const Icon = useIcon(styles, size);
  const onClickHandler = useClickEvent(disabledRippleEffect, onClick, triggerRippleEffect);
  const sxClassName = useSX(depsSx, sx);

  return (
    <E2EDataAttribute type={e2eAttribute} value={e2eValue}>
      <button
        className={cx(
          sxClassName,
          classes.className,
          styles.Button,
          styles[buttonModificators[color]],
          styles[buttonModificators[size]],
          styles[buttonModificators[variant]],
          {
            [styles['Button--fullwidth']]: fullWidth,
            [styles['Button--forced-hover']]: forcedHover,
          },
        )}
        disabled={disabled}
        onClick={onClickHandler}
        ref={ref}
        type={type}
        {...restProps}
      >
        {startIcon && <Icon name={startIcon} placement="start" />}
        {children}
        {endIcon && <Icon name={endIcon} placement="end" />}
        {rippleEffect}
      </button>
    </E2EDataAttribute>
  );
};

export default Button;
