import { createPortal } from 'react-dom';
import { FC, ReactNode, useRef } from 'react';
import { noop } from 'lodash';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from 'shared/E2EDataAttributes/E2EDataAttribute';
import Icon, { TIconProps } from 'shared/UI/components/Icon/Icon';

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
  loop?: boolean;
  max: number;
  min: number;
  onChange: (value: number) => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  value: number;
};

export const ScrubbableInput: FC<TScrubbableInputProps> = ({
  children,
  disabled = false,
  e2eValue = '',
  icon,
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
      <div
        className={cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.disabled,
          disabled,
        ])}
        ref={inputRef}
        {...events}
      >
        {children}
        {icon && (
          <Icon
            classes={{ className: cx(classNamesWithTheme.icon) }}
            color={ColorsTheme.neutral2}
            disabled={disabled}
            name={icon}
          />
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
      </div>
    </E2EDataAttribute>
  );
};

export default ScrubbableInput;
