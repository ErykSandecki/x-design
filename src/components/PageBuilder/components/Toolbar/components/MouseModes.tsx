import { FC } from 'react';

// components
import { Box, Icon } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { MOUSE_MODE_ICON } from '../constants';

// styles
import styles from './mouse-modes.scss';

// types
import { MouseMode } from '../../../enums';

// utils
import { enumToArray } from 'utils';

export type TMouseModeProps = {
  mouseMode: MouseMode;
  setMouseMode: (mouseMode: MouseMode) => void;
};

const MouseModes: FC<TMouseModeProps> = ({ mouseMode, setMouseMode }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box classes={{ className: cx(classNamesWithTheme[className]) }}>
      {enumToArray<string>(MouseMode).map((name) => (
        <Box
          classes={{
            className: cx(classNamesWithTheme.button.name, [
              classNamesWithTheme.button.modificators.active,
              mouseMode === name,
            ]),
          }}
          key={name}
          onClick={() => setMouseMode(name as MouseMode)}
        >
          <Icon e2eValue={name} name={MOUSE_MODE_ICON[name]} />
        </Box>
      ))}
    </Box>
  );
};

export default MouseModes;
