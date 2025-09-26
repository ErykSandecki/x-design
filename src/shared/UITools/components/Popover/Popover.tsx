import { createPortal } from 'react-dom';
import { FC, RefObject, useRef } from 'react';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from '../../../E2EDataAttributes/E2EDataAttribute';
import { Icon, Small } from 'shared';

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

  const onClickHandler = (onClick?: TFuncion) => {
    onClick?.();
    setSelected(false);
  };

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
            <div className={cx(classNamesWithTheme.separator)} key={index} />
          ) : (
            <E2EDataAttribute
              key={index}
              type={E2EAttribute.popoverItem}
              value={index}
            >
              <div
                className={cx(classNamesWithTheme.item)}
                onClick={() => onClickHandler(item.onClick)}
              >
                <Icon
                  classes={{
                    className: cx(classNamesWithTheme.checkIcon.name, [
                      classNamesWithTheme.checkIcon.modificators.selected,
                      item.selected,
                    ]),
                  }}
                  height={12}
                  name="Check"
                  width={12}
                />
                {item.icon && (
                  <Icon
                    classes={{ className: cx(classNamesWithTheme.itemIcon) }}
                    height={12}
                    name={item.icon}
                    width={12}
                  />
                )}
                <Small
                  classes={{ className: cx(classNamesWithTheme.itemText) }}
                >
                  {item.text}
                </Small>
              </div>
            </E2EDataAttribute>
          ),
        )}
      </div>
    </E2EDataAttribute>,
    document.getElementById('dropdown'),
  );
};

export default Popover;
