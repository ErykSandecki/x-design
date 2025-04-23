import { createPortal } from 'react-dom';
import { FC, ReactNode, useRef } from 'react';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from 'shared/E2EDataAttributes/E2EDataAttribute';
import Icon from 'shared/UI/components/Icon/Icon';

// hooks
import { useScrubbableInputEvents } from './hooks/useScrubbableInputEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './scrubbable-input.scss';

// types
import { E2EAttribute } from 'types';

export type TScrubbableInput = {
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
  max: number;
  min: number;
  onChange: (value: number) => void;
  value: number;
};

export const ScrubbableInput: FC<TScrubbableInput> = ({
  children,
  e2eValue = '',
  max,
  min,
  onChange,
  value,
}) => {
  const inputRef = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { mousePosition, ...events } = useScrubbableInputEvents(
    inputRef,
    max,
    min,
    onChange,
    value,
  );

  return (
    <E2EDataAttribute type={E2EAttribute.scrubbableInput} value={e2eValue}>
      <div
        className={cx(classNamesWithTheme[className])}
        ref={inputRef}
        {...events}
      >
        {children}
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
