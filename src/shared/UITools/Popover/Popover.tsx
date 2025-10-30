import { createPortal } from 'react-dom';
import { CSSProperties, FC, ReactNode, RefObject, useRef } from 'react';

// components
import Box from 'shared/UI/Box/Box';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import PopoverHeader from './PopoverHeader/PopoverHeader';
import PopoverItem from './PopoverItem/PopoverItem';
import PopoverPreview from './PopoverPreview/PopoverPreview';
import PopoverPreviewItem from './PopoverPreview/PopoverPreviewItem/PopoverPreviewItem';
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
import { AlignPopoverHorizontally, AlignPopoverVertically } from './enums';
import { E2EAttribute } from 'types';
import { TSXColor } from '../../UI/hooks/sx/types/types';

// utils
import { getPosition } from './utils/getPosition';
import { stopPropagation } from 'utils';

export type TPopoverProps = {
  alignHorizontally?: AlignPopoverHorizontally;
  alignVertically?: AlignPopoverVertically;
  backgroundColor?: TSXColor;
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
  id?: string;
  offset?: T2DCoordinates;
  refItem: RefObject<HTMLElement>;
  selected: boolean;
  style?: CSSProperties;
};

export const Popover: FC<TPopoverProps> = ({
  alignHorizontally = AlignPopoverHorizontally.right,
  alignVertically = AlignPopoverVertically.center,
  backgroundColor = 'neutral4',
  children,
  e2eValue,
  id,
  offset = BASE_2D,
  refItem,
  selected,
  style,
}) => {
  const refPopover = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { left, top } = getPosition(alignHorizontally, alignVertically, refItem, refPopover);
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
        id={id}
        onClick={stopPropagation}
        onMouseOver={stopPropagation}
        ref={refPopover}
        style={{ ...style, left: x, top: y }}
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
  PopoverPreview,
  PopoverPreviewItem,
  PopoverRoot,
  PopoverSeparator,
};

export default Popover;
