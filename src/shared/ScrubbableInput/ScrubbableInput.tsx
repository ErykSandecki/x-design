import { createPortal } from 'react-dom';
import { FC, ReactNode, useRef } from 'react';
import { noop } from 'lodash';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../E2EDataAttributes/E2EDataAttribute';
import Box from '../UI/Box/Box';
import Icon, { TIconProps } from '../UI/Icon/Icon';

// hooks
import { useScrubbableInputEvents } from './hooks/useScrubbableInputEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './scrubbable-input.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';

export type TScrubbableInputProps = {
  children?: ReactNode;
  disabled?: boolean;
  e2eValue?: TE2EDataAttributeProps['value'];
  icon?: TIconProps['name'];
  iconHeight?: number;
  iconWidth?: number;
  loop?: boolean;
  max: number;
  min: number;
  onChange: TFunc<[number]>;
  onMouseDown?: TFunc;
  onMouseUp?: TFunc;
  value: number;
};

export const ScrubbableInput: FC<TScrubbableInputProps> = ({
  children,
  disabled = false,
  e2eValue = '',
  icon,
  iconHeight = 12,
  iconWidth = 12,
  loop,
  max,
  min,
  onChange,
  onMouseDown = noop,
  onMouseUp = noop,
  value,
}) => {
  const inputRef = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const { mousePosition, ...events } = useScrubbableInputEvents(
    inputRef,
    loop,
    max,
    min,
    onChange,
    onMouseDown,
    onMouseUp,
    value,
  );

  return (
    <E2EDataAttribute type={E2EAttribute.scrubbableInput} value={e2eValue}>
      <Box
        classes={{
          className: cx(classNamesWithTheme[className].name, [
            classNamesWithTheme[className].modificators.disabled,
            disabled,
          ]),
        }}
        ref={inputRef}
        sx={{ alignItems: 'center', display: 'flex' }}
        {...events}
      >
        {children}
        {icon && (
          <Icon color={ColorsTheme.neutral2} disabled={disabled} height={iconHeight} name={icon} width={iconWidth} />
        )}
        {mousePosition &&
          createPortal(
            <Icon
              classes={{ className: cx(classNamesWithTheme.handler) }}
              height={14}
              name="EWResize"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
              }}
              width={25}
            />,
            document.body,
          )}
      </Box>
    </E2EDataAttribute>
  );
};

export default ScrubbableInput;
