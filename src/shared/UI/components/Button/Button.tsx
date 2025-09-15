import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from '../../../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useIcon } from './hooks/useIcon';
import { useRippleEffect } from 'hooks/useRippleEffect/useRippleEffect';
import { useSX } from '../../hooks/sx/useSX';
import { useTheme } from 'hooks';

// others
import {
  classes,
  className as classNameButton,
  classNames,
} from './classNames';

// styles
import styles from './styles/button.scss';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { E2EAttribute } from 'types';
import { InputSize } from '../../enums';
import { TButtonIcon } from './types';
import { TUIProps } from '../../types';

export type TButtonProps = Omit<
  ButtonHTMLAttributes<HTMLElement>,
  'className' | 'color' | 'style'
> &
  TUIProps<typeof classes> & {
    children?: ReactNode;
    color?: ButtonColor;
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
  const sxClassName = useSX(depsSx, sx);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const Icon = useIcon(classNamesWithTheme, cx, size);
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
          sxClassName,
          classes.className,
          classNamesWithTheme[classNameButton].name,
          [
            classNamesWithTheme[classNameButton].modificators.fullwidth,
            fullWidth,
          ],
          [
            classNamesWithTheme[classNameButton].modificators.forcedHover,
            forcedHover,
          ],
          classNamesWithTheme[classNameButton].modificators[color],
          classNamesWithTheme[classNameButton].modificators[size],
          classNamesWithTheme[classNameButton].modificators[variant],
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
};

export default Button;
