import cx from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

// components
import Box from '../../UI/Box/Box';
import Icon from '../../UI/Icon/Icon';
import { Small } from 'shared/UI/Typography';

// others

// styles
import styles from './checkbox.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// utils
import { getAttributes } from '../../E2EDataAttributes/utils';

export type TCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'popover' | 'value'
> & {
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  isMixed?: boolean;
  label: string;
  onChange: TFunc<[boolean]>;
  value: boolean;
};

export const Checkbox: FC<TCheckboxProps> = ({
  className,
  e2eValue = '',
  isMixed = false,
  label,
  onChange,
  value,
  ...restProps
}) => {
  return (
    <Box
      classes={{
        className: cx(styles.Checkbox, className),
      }}
      e2eAttribute={E2EAttribute.checkbox}
      e2eValue={e2eValue}
    >
      <input
        className={cx(styles.Checkbox__input)}
        onClick={() => onChange(!value)}
        type="checkbox"
        {...getAttributes(E2EAttribute.checkboxInput, e2eValue)}
        {...restProps}
      />
      <Box classes={{ className: cx(styles['Checkbox__input-wrapper']) }}>
        {value && !isMixed && <Icon name="Checkbox" height={8} width={8} />}
        {isMixed && <Icon name="CheckboxMixed" height={8} width={8} />}
      </Box>
      <Small classes={{ className: cx(styles.Checkbox__label) }}>{label}</Small>
    </Box>
  );
};

export default Checkbox;
