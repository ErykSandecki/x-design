import cx from 'classnames';
import { FC, ReactNode } from 'react';

// styles
import styles from './section-column-button-icons.scss';

export type TSectionColumnButtonIconsProps = {
  buttonsIcon?: Array<ReactNode>;
};

export const SectionColumnButtonIcons: FC<TSectionColumnButtonIconsProps> = ({ buttonsIcon = [] }) => (
  <div>
    <div className={cx(styles.SectionColumnButtonIcons)}>{buttonsIcon.map((buttonIcon) => buttonIcon)}</div>
  </div>
);

export default SectionColumnButtonIcons;
