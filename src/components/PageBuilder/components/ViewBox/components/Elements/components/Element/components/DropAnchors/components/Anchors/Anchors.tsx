import { FC, useMemo } from 'react';

// components
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './anchors.scss';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { E2EAttribute } from 'types';
import { TUseMouseEnterEvent } from '../../hooks/useMouseEnterEvent';
import { TUseMouseLeaveEvent } from '../../hooks/useMouseLeaveEvent';

// utils
import { getDropAnchorsPosition } from './utils/getDropAnchorsPosition';

export type TAnchorsProps = {
  isFlowVertical: boolean;
  isGrid: boolean;
  onMouseEnter: TUseMouseEnterEvent;
  onMouseLeave: TUseMouseLeaveEvent;
};

const Anchors: FC<TAnchorsProps> = ({ isFlowVertical, isGrid, onMouseEnter, onMouseLeave }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const anchors = useMemo(() => getDropAnchorsPosition(isFlowVertical, isGrid), [isFlowVertical, isGrid]);

  return anchors.map((position) => (
    <Box
      classes={{
        className: cx(
          classNamesWithTheme[className].name,
          classNamesWithTheme[className].modificators[position as keyof typeof DropAnchorsPosition],
        ),
      }}
      e2eAttribute={E2EAttribute.anchor}
      e2eValue={position as string}
      onMouseEnter={() => onMouseEnter(DropAnchorsPosition[position as keyof typeof DropAnchorsPosition])}
      onMouseLeave={onMouseLeave}
      key={position as string}
      sx={{ position: 'absolute' }}
    />
  ));
};

export default Anchors;
