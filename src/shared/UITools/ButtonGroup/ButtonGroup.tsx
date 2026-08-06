import cx from 'classnames';
import { FC, HTMLAttributes } from 'react';
import { kebabCase } from 'lodash';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../UI/Icon/Icon';
import Tooltip from '../../UI/Tooltip/Tooltip';

// styles
import styles from './button-group.module.scss';

// types
import { E2EAttribute } from 'types';
import { TButtonGroup } from './types';

export type TSectionProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
  buttons: Array<TButtonGroup>;
  e2eValue?: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
};

export const ButtonGroup: FC<TSectionProps> = ({ buttons, e2eValue = '', fullWidth = false, ...restProps }) => {
  return (
    <E2EDataAttribute type={E2EAttribute.buttonGroup} value={e2eValue}>
      <div
        className={cx(styles.ButtonGroup, {
          [styles['ButtonGroup--full-width']]: fullWidth,
        })}
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
      </div>
    </E2EDataAttribute>
  );
};

export default ButtonGroup;
