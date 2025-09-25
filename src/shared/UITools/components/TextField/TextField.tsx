import { FC, InputHTMLAttributes, ReactNode, Ref, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box from '../../../UI/components/Box/Box';
import Icon from 'shared/UI/components/Icon/Icon';
import Popover from '../Popover/Popover';

// hooks
import { useOutsideClick, useTheme } from 'hooks';

// others
import { className as textFieldClassName, classNames } from './classNames';

// styles
import styles from './text-field.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TPopover } from '../Popover/types';

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
  popover?: TPopover;
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
  popover,
  ref,
  startAdornment,
  ...restProps
}) => {
  const refItem = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { selected, setSelected } = useOutsideClick(
    [],
    refItem,
    noop,
    idContainer,
  );

  return (
    <Box
      classes={{
        className: cx(
          className,
          classNamesWithTheme[textFieldClassName].name,
          [
            classNamesWithTheme[textFieldClassName].modificators.disabled,
            disabled,
          ],
          [
            classNamesWithTheme[textFieldClassName].modificators.fullWidth,
            fullWidth,
          ],
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
      {popover ? (
        <div className={cx(classNamesWithTheme.iconWrapper)} ref={refItem}>
          <Icon
            classes={{ className: cx(classNamesWithTheme.icon) }}
            clickable
            height={12}
            name="Variant"
            onClick={() => setSelected(!selected)}
            width={12}
          />
          <Popover
            e2eValue="dropdown"
            popover={popover}
            refItem={refItem}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      ) : (
        endAdorment
      )}
    </Box>
  );
};

export default TextField;
