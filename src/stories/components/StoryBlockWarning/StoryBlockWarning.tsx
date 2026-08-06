import cx from 'classnames';
import { FC, ReactNode } from 'react';

// others

// styles
import styles from './story-block-warning.scss';

export type TStroyBlockWarningProps = {
  children: ReactNode;
};

export const StroyBlockWarning: FC<TStroyBlockWarningProps> = ({ children = null }) => {
  return (
    <blockquote className={cx(styles['StoryBlockWarning'])}>
      <p className={cx(styles['StoryBlockWarning__context'])}>
        <span className={cx(styles['StoryBlockWarning__icon-warning'])}>⚠️</span> {children}
      </p>
    </blockquote>
  );
};

export default StroyBlockWarning;
