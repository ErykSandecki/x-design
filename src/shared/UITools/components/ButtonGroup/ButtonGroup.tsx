import { FC } from 'react';
import { kebabCase } from 'lodash';

// components
import Box, { TBoxProps } from '../../../UI/components/Box/Box';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../../UI/components/Icon/Icon';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './button-group.scss';

// types
import { E2EAttribute } from 'types';
import { TButtonGroup } from './types';

export type TSectionProps = TBoxProps & {
  buttons: Array<TButtonGroup>;
  e2eValue?: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
};

export const ButtonGroup: FC<TSectionProps> = ({ buttons, e2eValue = '', fullWidth = false, ...restProps }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.fullWidth,
          fullWidth,
        ]),
      }}
      e2eAttribute={E2EAttribute.buttonGroup}
      e2eValue={e2eValue}
      {...restProps}
    >
      {buttons.map(({ disabled, name, onClick }) => (
        <E2EDataAttribute key={kebabCase(name)} type={E2EAttribute.buttonGroupInput} value={kebabCase(name)}>
          <div
            className={cx(classNamesWithTheme.button.name, [
              classNamesWithTheme.button.modificators.disabled,
              disabled,
            ])}
            onClick={onClick}
          >
            <Icon
              classes={{
                className: cx(classNamesWithTheme.icon.name, [
                  classNamesWithTheme.icon.modificators.disabled,
                  disabled,
                ]),
              }}
              height={12}
              name={name}
              width={12}
            />
          </div>
        </E2EDataAttribute>
      ))}
    </Box>
  );
};

export default ButtonGroup;
