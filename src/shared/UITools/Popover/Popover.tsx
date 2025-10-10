import { createPortal } from 'react-dom';
import { FC, ReactNode, RefObject, useRef } from 'react';

// components
import Box from 'shared/UI/Box/Box';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import PopoverItem from './PopoverItem/PopoverItem';
import PopoverRoot from './PopoverRoot/PopoverRoot';
import PopoverSeparator from './PopoverSeparator/PopoverSeparator';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './popover.scss';

// types
import { E2EAttribute } from 'types';

// utils
import { getPosition } from './utils/getPosition';

export type TPopoverProps = {
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
  refItem: RefObject<HTMLElement>;
  selected: boolean;
};

export const Popover: FC<TPopoverProps> = ({ children, e2eValue, refItem, selected }) => {
  const refPopover = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { left, top } = getPosition(refItem, refPopover);

  return createPortal(
    <E2EDataAttribute type={E2EAttribute.popover} value={e2eValue}>
      <Box
        classes={{
          className: cx(classNamesWithTheme[className].name, [
            classNamesWithTheme[className].modificators.selected,
            selected,
          ]),
        }}
        ref={refPopover}
        style={{ left, top }}
        sx={{
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
  PopoverItem,
  PopoverRoot,
  PopoverSeparator,
};

export default Popover;
