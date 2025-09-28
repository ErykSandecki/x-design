import { FC } from 'react';

// components
import E2EDataAttribute from '../../../../../E2EDataAttributes/E2EDataAttribute';
import { Box, Icon, Small, TIconProps } from 'shared';

// core
import { usePopoverRoot } from '../PopoverRoot/core/PopoverRootProvider';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './popover-item.scss';

// types
import { E2EAttribute } from 'types';

export type TPopoverItemProps = {
  icon?: TIconProps['name'];
  index: number;
  onClick?: TFunc;
  selected?: boolean;
  text: string;
};

export const PopoverItem: FC<TPopoverItemProps> = ({ icon, index, onClick, selected, text }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { setSelected } = usePopoverRoot();
  const onClickHandler = useClickEvent(onClick, setSelected);

  return (
    <E2EDataAttribute type={E2EAttribute.popoverItem} value={index}>
      <Box
        classes={{ className: cx(classNamesWithTheme[className]) }}
        onClick={onClickHandler}
        sx={{
          alignItems: 'center',
          borderRadius: '5px',
          columnGap: '10px',
          display: 'flex',
          height: '24px',
          justifyContent: 'left',
          px: 5,
        }}
      >
        <Icon
          classes={{
            className: cx(classNamesWithTheme.checkIcon.name, [
              classNamesWithTheme.checkIcon.modificators.selected,
              selected,
            ]),
          }}
          height={12}
          name="Check"
          width={12}
        />
        {icon && <Icon classes={{ className: cx(classNamesWithTheme.icon) }} height={12} name={icon} width={12} />}
        <Small classes={{ className: cx(classNamesWithTheme.text) }}>{text}</Small>
      </Box>
    </E2EDataAttribute>
  );
};

export default PopoverItem;
