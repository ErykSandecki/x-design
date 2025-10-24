import { createPortal } from 'react-dom';
import { FC, ReactNode, RefObject, useRef } from 'react';

// components
import Box from 'shared/UI/Box/Box';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import PopoverHeader from './PopoverHeader/PopoverHeader';
import PopoverItem from './PopoverItem/PopoverItem';
import PopoverRoot from './PopoverRoot/PopoverRoot';
import PopoverSeparator from './PopoverSeparator/PopoverSeparator';

// hooks
import { useTheme } from 'hooks';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';
import { className, classNames } from './classNames';

// styles
import styles from './popover.scss';

// types
import { E2EAttribute } from 'types';
import { TSXColor } from '../../UI/hooks/sx/types/types';

// utils
import { getPosition } from './utils/getPosition';
import { stopPropagation } from 'utils';

export type TPopoverProps = {
  backgroundColor?: TSXColor;
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
  offset?: T2DCoordinates;
  refItem: RefObject<HTMLElement>;
  selected: boolean;
};

export const Popover: FC<TPopoverProps> = ({
  backgroundColor = 'neutral4',
  children,
  e2eValue,
  offset = BASE_2D,
  refItem,
  selected,
}) => {
  const refPopover = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { left, top } = getPosition(refItem, refPopover);
  const x = left - offset.x;
  const y = top - offset.y;

  return createPortal(
    <E2EDataAttribute type={E2EAttribute.popover} value={e2eValue}>
      <Box
        classes={{
          className: cx(classNamesWithTheme[className].name, [
            classNamesWithTheme[className].modificators.selected,
            selected,
          ]),
        }}
        depsSx={[backgroundColor]}
        onClick={stopPropagation}
        ref={refPopover}
        style={{ left: x, top: y }}
        sx={{
          bg: backgroundColor,
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          px: 10,
          py: 7.5,
          width: 'max-content',
        }}
      >
        {children}
      </Box>
    </E2EDataAttribute>,
    document.getElementById('dropdown'),
  );
};

export const PopoverCompound = {
  PopoverHeader,
  PopoverItem,
  PopoverRoot,
  PopoverSeparator,
};

export default Popover;
