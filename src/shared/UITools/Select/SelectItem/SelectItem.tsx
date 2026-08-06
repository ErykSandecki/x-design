import cx from 'classnames';
import { FC, MouseEvent, ReactNode, useRef } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Icon from '../../../UI/Icon/Icon';

// others

// styles
import styles from './select-item.scss';

// types
import { E2EAttribute } from 'types';

export type TSelectItemProps = {
  children: ReactNode;
  disabled?: boolean;
  onMouseEnter?: TFunc<[MouseEvent]>;
  onMouseLeave?: TFunc<[MouseEvent]>;
  selectedValue?: string | Array<string>;
  value: string;
};

export const SelectItem: FC<TSelectItemProps> = ({
  children,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
  selectedValue,
  value,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const isSelected = selectedValue === value;

  return (
    <Box
      classes={{
        className: cx(styles.SelectItem, {
          [styles['SelectItem--disabled']]: disabled,
          [styles['SelectItem--selected']]: isSelected,
        }),
      }}
      component="li"
      data-value={value}
      e2eAttribute={E2EAttribute.selectItem}
      e2eValue={value}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      role="option"
      tabIndex={0}
    >
      <Icon
        classes={{
          className: cx(styles['SelectItem__check-icon'], {
            [styles['SelectItem__check-icon--selected']]: isSelected,
          }),
        }}
        height={12}
        name="Check"
        width={12}
      />
      {children}
    </Box>
  );
};

export default SelectItem;
