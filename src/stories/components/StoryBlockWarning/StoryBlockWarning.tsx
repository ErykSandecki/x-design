import { FC, ReactNode } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameStoryBlockWarning, classNames } from './classNames';

// styles
import styles from './story-block-warning.scss';

export type TStroyBlockWarningProps = {
  children: ReactNode;
};

export const StroyBlockWarning: FC<TStroyBlockWarningProps> = ({ children = null }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <blockquote className={cx(classNamesWithTheme[classNameStoryBlockWarning])}>
      <p className={cx(classNamesWithTheme.context)}>
        <span className={cx(classNamesWithTheme.iconWarning)}>⚠️</span> {children}
      </p>
    </blockquote>
  );
};

export default StroyBlockWarning;
