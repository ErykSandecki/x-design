import { FC, ReactNode, useRef } from 'react';

// components
import Box from '../../../UI/Box/Box';
import E2EDataAttribute from 'shared/E2EDataAttributes/E2EDataAttribute';
import Icon from '../../../UI/Icon/Icon';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './select-item.scss';

// types
import { E2EAttribute } from 'types';

export type TSelectItemProps = {
  children: ReactNode;
  disabled?: boolean;
  index?: number;
  selectedValue?: string | Array<string>;
  value: string;
};

export const SelectItem: FC<TSelectItemProps> = ({ children, disabled = false, index = -1, selectedValue, value }) => {
  const ref = useRef<HTMLLIElement>(null);
  const isSelected = selectedValue === value;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <E2EDataAttribute type={E2EAttribute.selectItem} value={index}>
      <Box
        classes={{
          className: cx(
            classNamesWithTheme[className].name,
            [classNamesWithTheme[className].modificators.disabled, disabled],
            [classNamesWithTheme[className].modificators.selected, isSelected],
          ),
        }}
        component="li"
        data-value={value}
        ref={ref}
        role="option"
        tabIndex={0}
      >
        <Icon
          classes={{
            className: cx(classNamesWithTheme.checkIcon.name, [
              classNamesWithTheme.checkIcon.modificators.selected,
              isSelected,
            ]),
          }}
          height={12}
          name="Check"
          width={12}
        />
        {children}
      </Box>
    </E2EDataAttribute>
  );
};

export default SelectItem;
