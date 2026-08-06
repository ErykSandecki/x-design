import cx from 'classnames';
import { FC, RefObject } from 'react';

// components
import Icon from '../../../../UI/Icon/Icon';
import Popover, { PopoverCompound, TPopoverProps } from '../../../Popover/Popover';

// hooks
import { useClickEvent } from './hooks/useClickEvent';

// others

// styles
import styles from './text-field-popover.module.scss';

export type TTextFieldPopoverProps = Pick<TPopoverProps, 'children' | 'offset' | 'style'> & {
  attachedValue: boolean;
  classNameIcon: string;
  onClick: TFunc;
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const TextFieldPopover: FC<TTextFieldPopoverProps> = ({
  attachedValue,
  children,
  classNameIcon,
  offset,
  onClick,
  ref,
  selected,
  setSelected,
  style,
}) => {
  const onClickDetachedValue = useClickEvent(onClick);

  return (
    <div className={cx(styles.TextFieldPopover)} ref={ref}>
      {!attachedValue && (
        <Icon
          classes={{ className: cx(styles.TextFieldPopover__icon, classNameIcon) }}
          clickable
          height={12}
          name="Variant"
          onClick={() => setSelected(!selected)}
          width={12}
        />
      )}
      {attachedValue && (
        <Icon
          classes={{ className: cx(styles.TextFieldPopover__icon, classNameIcon) }}
          clickable
          height={12}
          name="Detached"
          onClick={onClickDetachedValue}
          width={12}
        />
      )}
      <Popover e2eValue="popover" offset={offset} refItem={ref} selected={selected} style={style}>
        <PopoverCompound.PopoverRoot selected={selected} setSelected={setSelected}>
          {children}
        </PopoverCompound.PopoverRoot>
      </Popover>
    </div>
  );
};

export default TextFieldPopover;
