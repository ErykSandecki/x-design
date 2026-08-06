import cx from 'classnames';
import { FC } from 'react';
import { kebabCase } from 'lodash';

// components
import Box, { TBoxProps } from '../../UI/Box/Box';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../UI/Icon/Icon';
import Tooltip from '../../UI/Tooltip/Tooltip';

// others

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
  return (
    <Box
      classes={{
        className: cx(styles.ButtonGroup, {
          [styles['ButtonGroup--full-width']]: fullWidth,
        }),
      }}
      e2eAttribute={E2EAttribute.buttonGroup}
      e2eValue={e2eValue}
      {...restProps}
    >
      {buttons.map(({ disabled, name, onClick, tooltip }) => (
        <Tooltip
          e2eAttribute={E2EAttribute.buttonGroupInput}
          e2eValue={kebabCase(name)}
          key={kebabCase(name)}
          {...tooltip}
        >
          <div
            className={cx(styles.ButtonGroup__button, {
              [styles['ButtonGroup__button--disabled']]: disabled,
            })}
            onClick={onClick}
          >
            <Icon
              classes={{
                className: cx(styles.ButtonGroup__icon, {
                  [styles['ButtonGroup__icon--disabled']]: disabled,
                }),
              }}
              height={12}
              name={name}
              width={12}
            />
          </div>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ButtonGroup;
