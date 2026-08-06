import cx from 'classnames';
import { FC } from 'react';

// components
import { E2EDataAttribute, Icon } from 'shared';

// others
import { MOUSE_MODE_ICON } from '../constants';

// styles
import styles from './mouse-modes.module.scss';

// types
import { E2EAttribute } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';

// utils
import { enumToArray, mapAttributes } from 'utils';

export type TMouseModeProps = {
  mouseMode: MouseMode;
  setMouseMode: TFunc<[MouseMode]>;
};

const MouseModes: FC<TMouseModeProps> = ({ mouseMode, setMouseMode }) => {
  return (
    <E2EDataAttribute type={E2EAttribute.box} value="toolbar">
      <div className={cx(styles.MouseModes)}>
        {enumToArray<string>(MouseMode).map((name) => {
          const isActive = mouseMode === name;

          return (
            <E2EDataAttribute key={name} type={E2EAttribute.box} value={name}>
              <div
                className={cx(styles.MouseModes__button, {
                  [styles['MouseModes__button--active']]: isActive,
                })}
                onClick={() => setMouseMode(name as MouseMode)}
                {...mapAttributes({ [E2EAttribute.active]: isActive })}
              >
                <Icon e2eValue={name} name={MOUSE_MODE_ICON[name]} />
              </div>
            </E2EDataAttribute>
          );
        })}
      </div>
    </E2EDataAttribute>
  );
};

export default MouseModes;
