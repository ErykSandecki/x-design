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
import { MouseMode } from '../../../../../types/enums/mouseMode';

// utils
import { enumToArray } from 'utils';

export type TMouseModeProps = {
  mouseMode: MouseMode;
  setMouseMode: TFunc<[MouseMode]>;
};

const MouseModes: FC<TMouseModeProps> = ({ mouseMode, setMouseMode }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box classes={{ className: cx(classNamesWithTheme[className]) }} sx={{ display: 'flex', height: '100%' }}>
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
          sx={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center', width: '55px' }}
        >
          <Icon e2eValue={name} name={MOUSE_MODE_ICON[name]} />
        </Box>
      ))}
    </Box>
  );
};

export default MouseModes;
