import cx from 'classnames';
import { FC } from 'react';

// components

// others

// styles
import styles from './preview-box-sizing.scss';

// types
import { TPreviewData } from 'shared';

const previewBoxSizingModificators: Record<string, string> = {
  excluded: 'PreviewBoxSizing--excluded',
};

const strokeModificators: Record<string, string> = {
  excluded: 'PreviewBoxSizing__stroke--excluded',
};

export type TPreviewBoxSizingProps = Pick<TPreviewData, 'activeOption'>;

const PreviewBoxSizing: FC<TPreviewBoxSizingProps> = ({ activeOption }) => {
  return (
    <div className={cx(styles.PreviewBoxSizing, styles[previewBoxSizingModificators[activeOption]])}>
      <div className={cx(styles['PreviewBoxSizing__tile-left'])}>
        <div className={cx(styles['PreviewBoxSizing__tile-children'])} />
      </div>
      <div className={cx(styles['PreviewBoxSizing__tile-right'])}>
        <div className={cx(styles['PreviewBoxSizing__tile-children'])} />
      </div>
      <div className={cx(styles.PreviewBoxSizing__stroke, styles[strokeModificators[activeOption]])} />
    </div>
  );
};

export default PreviewBoxSizing;
