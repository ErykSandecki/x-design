import { createPortal } from 'react-dom';
import { FC, RefObject, useRef } from 'react';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from '../../../E2EDataAttributes/E2EDataAttribute';
import PopoverItem from './components/PopoverItem/PopoverItem';
import PopoverSeparator from './components/PopoverSeparator/PopoverSeparator';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './popover.scss';

// types
import { E2EAttribute } from 'types';
import { TPopover } from './types';

// utils
import { getPosition } from './utils/getPosition';

export type TPopoverProps = {
  e2eValue?: TE2EDataAttributeProps['value'];
  popover: TPopover;
  refItem: RefObject<HTMLElement>;
  selected: boolean;
  setSelected: (open: boolean) => void;
};

export const Popover: FC<TPopoverProps> = ({
  e2eValue,
  popover,
  refItem,
  selected,
  setSelected,
}) => {
  const refPopover = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { left, top } = getPosition(refItem, refPopover);

  return createPortal(
    <E2EDataAttribute type={E2EAttribute.popover} value={e2eValue}>
      <div
        className={cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.selected,
          selected,
        ])}
        ref={refPopover}
        style={{ left, top }}
      >
        {popover.data.map((item, index) =>
          'separator' in item ? (
            <PopoverSeparator key={index} />
          ) : (
            <PopoverItem
              icon={item.icon}
              index={index}
              key={index}
              onClick={item.onClick}
              selected={item.selected}
              setSelected={setSelected}
              text={item.text}
            />
          ),
        )}
      </div>
    </E2EDataAttribute>,
    document.getElementById('dropdown'),
  );
};

export default Popover;
