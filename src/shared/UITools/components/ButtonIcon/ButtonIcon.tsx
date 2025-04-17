import { FC } from 'react';

// components
import Box, { TBoxProps } from '../../../UI/components/Box/Box';
import Icon, { TIconProps } from '../../../UI/components/Icon/Icon';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './button-icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

export type TSectionProps = Pick<TIconProps, 'name'> &
  TBoxProps & {
    e2eValue?: TE2EDataAttributeProps['value'];
    selected?: boolean;
  };

export const ButtonIcon: FC<TSectionProps> = ({
  e2eValue = '',
  name,
  selected = false,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.selected,
          selected,
        ]),
      }}
      e2eAttribute={E2EAttribute.buttonIcon}
      e2eValue={e2eValue}
      {...restProps}
    >
      <Icon
        color={selected ? ColorsTheme.blue1 : ColorsTheme.neutral1}
        height={14}
        name={name}
        width={14}
      />
    </Box>
  );
};

export default ButtonIcon;
