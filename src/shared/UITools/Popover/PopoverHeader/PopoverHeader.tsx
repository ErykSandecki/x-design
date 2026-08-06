import cx from 'classnames';
import { FC } from 'react';

// components
import E2EDataAttribute from '../../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../../UI/Icon/Icon';
import { Small } from '../../../UI/Typography';

// core
import { usePopoverRoot } from '../PopoverRoot/core/PopoverRootProvider';

// styles
import styles from './popover-header.module.scss';

// types
import { E2EAttribute } from 'types';

export type TPopoverHeaderProps = {
  title: string;
};

export const PopoverHeader: FC<TPopoverHeaderProps> = ({ title }) => {
  const { setSelected } = usePopoverRoot();

  return (
    <E2EDataAttribute type={E2EAttribute.popoverHeader} value="">
      <div className={cx(styles.PopoverHeader)}>
        <Small style={{ fontSize: '11px' }}>{title}</Small>
        <Icon clickable name="Close" height={10} onClick={() => setSelected(false)} width={10} />
      </div>
    </E2EDataAttribute>
  );
};

export default PopoverHeader;
