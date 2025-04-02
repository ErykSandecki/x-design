import cx from 'classnames';
import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from 'react';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from '../../../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useIcon } from './hooks/useIcon';
import { useRippleEffect } from 'hooks/useRippleEffect/useRippleEffect';

// others
import { className as classNameButton, classNames } from './classNames';

// styles
import styles from './styles/button.scss';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { E2EAttribute } from 'types';
import { InputSize } from '../../enums';
import { TButtonIcon } from './types';

export type TButtonProps = Omit<
  ButtonHTMLAttributes<HTMLElement>,
  'disabled'
> & {
  children?: ReactNode;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  disabledRippleEffect?: boolean;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  endIcon?: TButtonIcon;
  forcedHover?: boolean;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
  size?: InputSize;
  startIcon?: TButtonIcon;
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      children,
      className = '',
      color = ButtonColor.primary,
      disabled = false,
      disabledRippleEffect = false,
      endIcon = null,
      e2eAttribute = E2EAttribute.button,
      e2eValue = '',
      forcedHover = false,
      fullWidth = false,
      onClick,
      size = InputSize.medium,
      startIcon = null,
      type = 'button',
      variant = ButtonVariant.contained,
      ...restProps
    },
    ref,
  ) => {
    const Icon = useIcon(size, styles);

    const { rippleEffect, triggerRippleEffect } = useRippleEffect(
      classNames[classNameButton].name,
      styles,
    );

    const onClickHandler = useClickEvent(
      disabledRippleEffect,
      onClick,
      triggerRippleEffect,
    );

    return (
      <E2EDataAttribute type={e2eAttribute} value={e2eValue}>
        <button
          className={cx(
            className,
            styles[classNames[classNameButton].name],
            {
              [styles[classNames[classNameButton].modificators.fullwidth]]:
                fullWidth,
            },
            {
              [styles[classNames[classNameButton].modificators.forcedHover]]:
                forcedHover,
            },
            styles[classNames[classNameButton].modificators[color]],
            styles[classNames[classNameButton].modificators[size]],
            styles[classNames[classNameButton].modificators[variant]],
          )}
          disabled={disabled}
          onClick={onClickHandler}
          ref={ref}
          type={type}
          {...restProps}
        >
          {startIcon && <Icon placement="start" src={startIcon} />}
          {children}
          {endIcon && <Icon placement="end" src={endIcon} />}
          {rippleEffect}
        </button>
      </E2EDataAttribute>
    );
  },
);

export default Button;
